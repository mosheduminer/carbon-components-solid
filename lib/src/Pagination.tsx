import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  mergeProps,
  on,
  splitProps,
} from "solid-js";
import { Button } from "./Button";
import { Select } from "./Select";
import { CaretLeft16 } from "../icons/icons/CaretLeft16";
import { CaretRight16 } from "../icons/icons/CaretRight16";
import { equals } from "./internal/array";
import { createFallbackId } from "./internal/id";
import { usePrefix } from "./internal/usePrefix";
import { SelectItem } from "./SelectItem";

export type PaginationProps = {
  backwardText?: string;
  class?: string;
  disabled?: boolean;
  forwardText?: string;
  id?: string | number;
  itemRangeText?: (min: number, max: number, total: number) => string;
  itemText?: (min: number, max: number) => string;
  itemsPerPageText?: string;
  onChange?: (arg: { pageSize: number; page: number }) => any;
  page: number;
  pageInputDisabled?: boolean;
  pageNumberText?: string;
  pageRangeText?: (current: number, total: number) => string;
  pageSize?: number;
  pageSizeInputDisabled?: boolean;
  pageSizes: number[] | { text: string; value: number }[];
  pageText?: (page: number) => string;
  pagesUnknown?: boolean;
  size?: "sm" | "md" | "lg";
  totalItems: number;
};

function mapPageSizesToObject(
  sizes: number[] | { text: string; value: number }[]
): { text: string; value: number }[] {
  return typeof sizes[0] === "object" && sizes[0] !== null
    ? (sizes as unknown as { text: string; value: number }[])
    : sizes.map((size) => ({ text: String(size), value: size as number }));
}

function renderSelectItems(total: () => number) {
  return (
    <For each={[...Array(total())]}>
      {(_, i) => <SelectItem value={i() + 1} text={String(i() + 1)} />}
    </For>
  );
}

function getPageSize(
  pageSizes: { text: string; value: number }[],
  pageSize: number | undefined
) {
  if (pageSize) {
    const hasSize = pageSizes.find((size) => {
      return pageSize === size.value;
    });

    if (hasSize) {
      return pageSize;
    }
  }
  return pageSizes[0].value;
}

const itemTextDefault = (min: number, max: number) => `${min}-${max} items`;
const itemRangeTextDefault = (min: number, max: number, total: number) =>
  `${min}-${max} of ${total} items`;
const pageRangeTextDefault = (_current: number, total: number) =>
  `of ${total} ${total === 1 ? "page" : "pages"}`;
const pageTextDefault = (page: number) => `page ${page}`;

export const Pagination: Component<PaginationProps> = (props) => {
  props = mergeProps(
    {
      backwardText: "Previous page",
      disabled: false,
      forwardText: "Next page",
      itemText: itemTextDefault,
      itemRangeText: itemRangeTextDefault,
      itemsPerPage: "Items per page:",
      pageNumberText: "Page Number",
      pageRangeText: pageRangeTextDefault,
      page: 1,
      pageText: pageTextDefault,
      pagesUnknown: false,
    },
    props
  );
  const [, rest] = splitProps(props, [
    "backwardText",
    "class",
    "disabled",
    "forwardText",
    "id",
    "itemText",
    "itemRangeText",
    "itemsPerPageText",
    "onChange",
    "pageNumberText",
    "pageRangeText",
    "page",
    "pageInputDisabled",
    "pageSize",
    "pageSizeInputDisabled",
    "pageSize",
    "pageText",
    "pagesUnknown",
    "size",
    "totalItems",
  ]);
  const prefix = usePrefix();
  const id = createMemo(() => createFallbackId(String(props.id)));
  const [pageSizes, setPageSizes] = createSignal(
    mapPageSizesToObject(props.pageSizes)
  );
  const [prevPageSizes, setPrevPageSizes] = createSignal(props.pageSizes);

  const [page, setPage] = createSignal(props.page);
  const [prevControlledPage, setPrevControlledPage] = createSignal(props.page);

  const [pageSize, setPageSize] = createSignal(
    getPageSize(pageSizes(), props.pageSize)
  );
  const [prevControlledPageSize, setPrevControlledPageSize] = createSignal(
    props.pageSize
  );

  const totalPages = () =>
    Math.max(Math.ceil(props.totalItems / pageSize()), 1);

  const backButtonDisabled = () => props.disabled || page() === 1;
  const forwardButtonDisabled = () => props.disabled || page() === totalPages();

  // Sync state with props
  createEffect(
    on([prevControlledPage, prevControlledPageSize, prevPageSizes], () => {
      if (props.page !== prevControlledPage()) {
        setPage(props.page);
        setPrevControlledPage(props.page);
      }

      if (props.pageSize !== prevControlledPageSize()) {
        setPageSize(getPageSize(pageSizes(), props.pageSize));
        setPrevControlledPageSize(props.pageSize);
      }

      if (!equals(props.pageSizes, prevPageSizes())) {
        const pageSizes = mapPageSizesToObject(props.pageSizes);

        const hasPageSize = pageSizes.find((size) => {
          return size.value === pageSize();
        });

        // Reset page to 1 if the current pageSize is not included in the new page
        // sizes
        if (!hasPageSize) {
          setPage(1);
        }

        setPageSizes(pageSizes);
        //@ts-ignore
        setPrevPageSizes(props.pageSizes);
      }
    })
  );

  function handleSizeChange(event: Event) {
    //@ts-ignore
    const pageSize = Number(event.currentTarget.value);
    const changes = {
      pageSize,
      page: 1,
    };

    setPage(changes.page);
    setPageSize(changes.pageSize);

    if (props.onChange) {
      props.onChange(changes);
    }
  }

  function handlePageInputChange(event: Event) {
    //@ts-ignore
    const page = Number(event.currentTarget.value);
    if (
      page > 0 &&
      page <= Math.max(Math.ceil(props.totalItems / pageSize()), 1)
    ) {
      setPage(page);

      if (props.onChange) {
        props.onChange({
          page,
          pageSize: pageSize(),
        });
      }
    }
  }

  function incrementPage() {
    const nextPage = page() + 1;
    setPage(nextPage);
    if (props.onChange) {
      props.onChange({
        page: nextPage,
        pageSize: pageSize(),
      });
    }
  }

  function decrementPage() {
    const nextPage = page() - 1;
    setPage(nextPage);
    if (props.onChange) {
      props.onChange({
        page: nextPage,
        pageSize: pageSize(),
      });
    }
  }

  return (
    <div
      classList={{
        [`${prefix}--pagination`]: true,
        [`${prefix}--pagination--${props.size}`]: !!props.size,
        [props.class!]: !!props.class,
      }}
      {...rest}
    >
      <div class={`${prefix}--pagination__left`}>
        <label
          id={`${prefix}-pagination-select-${id()}-count-label`}
          class={`${prefix}--pagination__text`}
          for={`${prefix}-pagination-select-${id()}`}
        >
          {props.itemsPerPageText}
        </label>
        <Select
          id={`${prefix}-pagination-select-${id()}`}
          class={`${prefix}--select__item-count`}
          labelText=""
          hideLabel
          noLabel
          inline
          onChange={handleSizeChange}
          disabled={props.pageSizeInputDisabled || props.disabled}
          value={pageSize()}
        >
          <For each={pageSizes()}>
            {(sizeObj) => (
              <SelectItem value={sizeObj.value} text={String(sizeObj.text)} />
            )}
          </For>
        </Select>
        <span
          class={`${prefix}--pagination__text ${prefix}--pagination__items-count`}
        >
          {props.pagesUnknown
            ? props.itemText!(
                pageSize() * (page() - 1) + 1,
                page() * pageSize()
              )
            : props.itemRangeText!(
                Math.min(pageSize() * (page() - 1) + 1, props.totalItems),
                Math.min(page() * pageSize(), props.totalItems),
                props.totalItems
              )}
        </span>
      </div>
      <div class={`${prefix}--pagination__right`}>
        <Select
          id={`${prefix}-pagination-select-${id()}-right`}
          class={`${prefix}--select__page-number`}
          labelText={`Page number, of ${totalPages} pages`}
          inline
          hideLabel
          onChange={handlePageInputChange}
          value={page()}
          disabled={props.pageInputDisabled || props.disabled}
        >
          {renderSelectItems(totalPages)}
        </Select>
        <span class={`${prefix}--pagination__text`}>
          {props.pagesUnknown
            ? props.pageText!(page())
            : props.pageRangeText!(page(), totalPages())}
        </span>
        <div class={`${prefix}--pagination__control-buttons`}>
          <Button
            kind="ghost"
            classList={{
              [`${prefix}--pagination__button`]: true,
              [`${prefix}--pagination__button--backward`]: true,
              [`${prefix}--pagination__button--no-index`]: backButtonDisabled(),
            }}
            hasIconOnly
            renderIcon={CaretLeft16}
            iconDescription={props.backwardText}
            tooltipAlignment="center"
            tooltipPosition="top"
            onClick={decrementPage}
            disabled={backButtonDisabled()}
          />
          <Button
            kind="ghost"
            classList={{
              [`${prefix}--pagination__button`]: true,
              [`${prefix}--pagination__button--forward`]: true,
              [`${prefix}--pagination__button--no-index`]:
                forwardButtonDisabled(),
            }}
            hasIconOnly
            renderIcon={CaretRight16}
            iconDescription={props.forwardText}
            tooltipAlignment="end"
            tooltipPosition="top"
            onClick={incrementPage}
            disabled={forwardButtonDisabled()}
          />
        </div>
      </div>
    </div>
  );
};
