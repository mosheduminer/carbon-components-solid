import { settings } from "carbon-components";
import {
  Component,
  createEffect,
  createSignal,
  Index,
  JSX,
  Match,
  mergeProps,
  on,
  splitProps,
  Switch,
} from "solid-js";
import { Button } from "./Button";
import { CaretRight16 } from "./icons/CaretRight16";
import { CaretLeft16 } from "./icons/CaretLeft16";
import { OverflowMenuHorizontal16 } from "./icons/OverflowMenuHorizontal16";
import { createDerivedSignal } from "./internal/derivedSignal";

const { prefix } = settings;

const translationIds = {
  "carbon.pagination-nav.next": "Next",
  "carbon.pagination-nav.previous": "Previous",
  "carbon.pagination-nav.item": "Page",
  "carbon.pagination-nav.active": "Active",
  "carbon.pagination-nav.of": "of",
};

function translateWithId(messageId: keyof typeof translationIds) {
  return translationIds[messageId];
}

function usePrevious<T>(value: () => T) {
  const [getter, setter] = createSignal<T>();

  createEffect(() => {
    setter(value);
  });

  return getter;
}

function getCuts(
  page: number,
  totalItems: number,
  itemsThatFit: number,
  splitPoint: number | undefined = undefined
) {
  if (itemsThatFit >= totalItems) {
    return {
      front: 0,
      back: 0,
    };
  }

  const split = splitPoint || Math.ceil(itemsThatFit / 2) - 1;

  let frontHidden = page + 1 - split;
  let backHidden = totalItems - page - (itemsThatFit - split) + 1;

  if (frontHidden <= 1) {
    backHidden -= frontHidden <= 0 ? Math.abs(frontHidden) + 1 : 0;
    frontHidden = 0;
  }

  if (backHidden <= 1) {
    frontHidden -= backHidden <= 0 ? Math.abs(backHidden) + 1 : 0;
    backHidden = 0;
  }

  return {
    front: frontHidden,
    back: backHidden,
  };
}

export type PaginationNavProps = {
  class?: string;
  itemsShown: number;
  loop?: boolean;
  onChange: Function;
  page: number;
  ref?: HTMLElement;
  totalItems: number;
  translateWithId?: Function;
};

export const PaginationNav: Component<PaginationNavProps> = (props) => {
  props = mergeProps({ translateWithId }, props);
  const [, rest] = splitProps(props, [
    "children",
    "class",
    "itemsShown",
    "loop",
    "onChange",
    "page",
    "ref",
    "totalItems",
    "translateWithId",
  ]);
  const [currentPage, setCurrentPage] = createDerivedSignal(() => props.page!);
  const [itemsThatFit, setItemsThatFit] = createSignal(
    props.itemsShown >= 4 ? props.itemsShown : 4
  );
  const [cuts, setCuts] = createSignal(
    getCuts(currentPage(), props.totalItems, itemsThatFit())
  );
  const prevPage = usePrevious(currentPage);

  function jumpToItem(index: number) {
    if (index >= 0 && index < props.totalItems) {
      setCurrentPage(index);
      props.onChange(index);
    }
  }

  function jumpToNext() {
    const nextIndex = currentPage() + 1;

    if (nextIndex >= props.totalItems) {
      if (props.loop) {
        jumpToItem(0);
      }
    } else {
      jumpToItem(nextIndex);
    }
  }

  function jumpToPrevious() {
    const previousIndex = currentPage() - 1;

    if (previousIndex < 0) {
      if (props.loop) {
        jumpToItem(props.totalItems - 1);
      }
    } else {
      jumpToItem(previousIndex);
    }
  }

  function pageWouldBeHidden(page: number) {
    const startOffset = itemsThatFit() <= 4 && page > 1 ? 0 : 1;

    const wouldBeHiddenInFront = page >= startOffset && page <= cuts().front;
    const wouldBeHiddenInBack =
      page >= props.totalItems - cuts().back - 1 &&
      page <= props.totalItems - 2;

    return wouldBeHiddenInFront || wouldBeHiddenInBack;
  }

  // jump to new page if props.page is updated
  createEffect(
    on(
      () => props.page,
      () => {
        setCurrentPage(props.page);
      },
      { defer: true }
    )
  );

  // re-calculate cuts if props.totalItems or props.itemsShown change
  createEffect(
    on(
      () => [props.itemsShown, props.totalItems],
      () => {
        setItemsThatFit(props.itemsShown >= 4 ? props.itemsShown : 4);
        setCuts(getCuts(currentPage(), props.totalItems, props.itemsShown));
      },
      { defer: true }
    )
  );

  // update cuts if necessary whenever currentPage changes
  createEffect(
    on(currentPage, () => {
      if (pageWouldBeHidden(currentPage())) {
        const delta = currentPage() - prevPage()! || 0;

        if (delta > 0) {
          const splitPoint = itemsThatFit() - 3;
          setCuts(
            getCuts(currentPage(), props.totalItems, itemsThatFit(), splitPoint)
          );
        } else {
          const splitPoint = itemsThatFit() > 4 ? 2 : 1;
          setCuts(
            getCuts(currentPage(), props.totalItems, itemsThatFit(), splitPoint)
          );
        }
      }
    })
  );

  const backwardButtonDisabled = !props.loop && currentPage() === 0;
  const forwardButtonDisabled =
    !props.loop && currentPage() === props.totalItems - 1;

  const startOffset = () => (itemsThatFit() <= 4 && currentPage() > 1 ? 0 : 1);

  return (
    <nav
      class={`${prefix}--pagination-nav`}
      classList={{ [props.class!]: !!props.class }}
      ref={props.ref}
      {...rest}
      aria-label="pagination"
    >
      <ul class={`${prefix}--pagination-nav__list`}>
        <DirectionButton
          direction="backward"
          label={props.translateWithId!("carbon.pagination-nav.previous")}
          disabled={backwardButtonDisabled}
          onClick={jumpToPrevious}
        />

        {
          // render first item if at least 5 items can be displayed or
          // 4 items can be displayed and the current page is either 0 or 1
          (itemsThatFit() >= 5 ||
            (itemsThatFit() <= 4 && currentPage() <= 1)) && (
            <PaginationItem
              page={1}
              translateWithId={props.translateWithId!}
              isActive={currentPage() === 0}
              onClick={() => {
                jumpToItem(0);
              }}
            />
          )
        }

        {/* render first overflow */}
        <PaginationOverflow
          fromIndex={startOffset()}
          count={cuts().front}
          onSelect={jumpToItem}
        />

        {
          // render items between overflows
          [...Array(props.totalItems)]
            .map((e, i) => i)
            .slice(startOffset() + cuts().front, (1 + cuts().back) * -1)
            .map((item) => (
              <PaginationItem
                page={item + 1}
                translateWithId={props.translateWithId!}
                isActive={currentPage() === item}
                onClick={() => {
                  jumpToItem(item);
                }}
              />
            ))
        }

        {/* render second overflow */}
        <PaginationOverflow
          fromIndex={props.totalItems - cuts().back - 1}
          count={cuts().back}
          onSelect={jumpToItem}
        />

        {
          // render last item unless there is only one in total
          props.totalItems > 1 && (
            <PaginationItem
              page={props.totalItems}
              translateWithId={props.translateWithId!}
              isActive={currentPage() === props.totalItems - 1}
              onClick={() => {
                jumpToItem(props.totalItems - 1);
              }}
            />
          )
        }

        <DirectionButton
          direction="forward"
          label={props.translateWithId!("carbon.pagination-nav.next")}
          disabled={forwardButtonDisabled}
          onClick={jumpToNext}
        />
      </ul>
      <div
        aria-live="polite"
        aria-atomic="true"
        className={`${prefix}--pagination-nav__accessibility-label`}
      >
        {`${props.translateWithId!("carbon.pagination-nav.item")} ${
          currentPage() + 1
        } ${props.translateWithId!("carbon.pagination-nav.of")} ${
          props.totalItems
        }`}
      </div>
    </nav>
  );
};

type PaginationOverflowProps = {
  count: number;
  fromIndex: number;
  onSelect: Function;
  translateWithId?: Function;
};

const PaginationOverflow: Component<PaginationOverflowProps> = (props) => {
  props = mergeProps({ translateWithId }, props);
  return (
    <Switch>
      <Match when={props.count > 1}>
        <li class={`${prefix}--pagination-nav__list-item`}>
          <div class={`${prefix}--pagination-nav__select`}>
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              class={`${prefix}--pagination-nav__page ${prefix}--pagination-nav__page--select`}
              aria-label={`Select ${props.translateWithId!(
                "carbon.pagination-nav.item"
              )} number`}
              onChange={(e) => {
                const index = Number(e.currentTarget.value);
                props.onSelect(index);
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <option value="" hidden />
              <Index each={[...Array(props.count)]}>
                {(e, i) => {
                  return (
                    <option
                      value={(props.fromIndex + i).toString()}
                      data-page={props.fromIndex + i + 1}
                    >
                      {props.fromIndex + i + 1}
                    </option>
                  );
                }}
              </Index>
            </select>
            <div className={`${prefix}--pagination-nav__select-icon-wrapper`}>
              <OverflowMenuHorizontal16
                className={`${prefix}--pagination-nav__select-icon`}
              />
            </div>
          </div>
        </li>
      </Match>
      <Match when={props.count === 1}>
        <PaginationItem
          page={props.fromIndex + 1}
          translateWithId={props.translateWithId!}
          onClick={() => {
            props.onSelect(props.fromIndex);
          }}
        />
      </Match>
    </Switch>
  );
};

type PaginationItemProps = {
  isActive?: boolean;
  onClick: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  page: number;
  translateWithId: Function;
};

const PaginationItem: Component<PaginationItemProps> = (props) => {
  props = mergeProps({ translateWithId }, props);
  const itemLabel = props.translateWithId("carbon.pagination-nav.item");

  return (
    <li className={`${prefix}--pagination-nav__list-item`}>
      <button
        type="button"
        class={`${prefix}--pagination-nav__page`}
        classList={{
          [`${prefix}--pagination-nav__page--active`]: props.isActive,
        }}
        onClick={props.onClick}
        data-page={props.page}
        aria-current={props.isActive ? "page" : undefined}
      >
        <span className={`${prefix}--pagination-nav__accessibility-label`}>
          {props.isActive
            ? `${props.translateWithId(
                "carbon.pagination-nav.active"
              )}, ${itemLabel}`
            : itemLabel}
        </span>
        {props.page}
      </button>
    </li>
  );
};

type DirectionButtonProps = {
  direction?: "forward" | "backward";
  disabled?: boolean;
  label?: string;
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
};

const DirectionButton: Component<DirectionButtonProps> = (props) => {
  return (
    <li className={`${prefix}--pagination-nav__list-item`}>
      <Button
        disabled={props.disabled}
        renderIcon={props.direction === "forward" ? CaretRight16 : CaretLeft16}
        kind="ghost"
        hasIconOnly
        iconDescription={props.label}
        tooltipAlignment="center"
        tooltipPosition="bottom"
        onClick={props.onClick}
      />
    </li>
  );
};
