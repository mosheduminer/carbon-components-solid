import { ArrowsVertical20 as Arrows } from "../icons/ArrowsVertical20";
import { ArrowUp20 as Arrow } from "../icons/ArrowUp20";
import { sortStates } from "./sorting";
import { uniqueId as createUniqueId } from "../internal/id";
import {
  children,
  Component,
  JSX,
  mergeProps,
  Show,
  splitProps,
} from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export const translationKeys = {
  buttonDescription: "carbon.table.header.icon.description",
};
type EnumSortStates = typeof sortStates;
type SortStates = keyof EnumSortStates;
type State = {
  header: JSX.Element;
  sortDirection: SortStates;
  isSortHeader: boolean;
  sortStates: EnumSortStates;
};

const translateWithId = (
  key: string,
  { header, sortDirection, isSortHeader, sortStates }: State
) => {
  if (key === translationKeys.buttonDescription) {
    if (isSortHeader) {
      // When transitioning, we know that the sequence of states is as follows:
      // NONE -> ASC -> DESC -> NONE
      if (sortDirection === sortStates.NONE) {
        return `Click to sort rows by ${header} header in ascending order`;
      }
      if (sortDirection === sortStates.ASC) {
        return `Click to sort rows by ${header} header in descending order`;
      }

      return `Click to unsort rows by ${header} header`;
    }
    return `Click to sort rows by ${header} header in ascending order`;
  }

  return "";
};

export const sortDirections = {
  [sortStates.NONE]: "none",
  [sortStates.ASC]: "ascending",
  [sortStates.DESC]: "descending",
} as const;

export type TableHeaderProps = {
  /**
   * Specify an optional className to be applied to the container node
   */
  class?: string;
  /**
   * Specify `colSpan` as a non-negative integer value to indicate how
   * many columns the TableHeader cell extends in a table
   */
  colSpan?: number;
  /**
   * Supply an id to the th element.
   */
  id?: string;
  /**
   * Specify whether this header is the header by which a table is being sorted
   * by
   */
  isSortHeader?: boolean;
  /**
   * Specify whether this header is one through which a user can sort the table
   */
  isSortable?: boolean;
  /**
   * Hook that is invoked when the header is clicked
   */
  onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  ref?: ((ref: HTMLTableCellElement) => any) | HTMLTableCellElement;
  /**
   * Specify the scope of this table header. You can find more info about this
   * attribute at the following URL:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
   */
  scope?: "col" | "row" | "rowgroup" | "colgroup";
  /**
   * Specify which direction we are currently sorting by, should be one of DESC,
   * NONE, or ASC.
   */
  sortDirection: SortStates;
  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are available on the `translationKeys` field for
   * this component.
   */
  translateWithId?: (key: string, state: State) => string;
} & JSX.HTMLAttributes<HTMLElement>;

export const TableHeader: Component<TableHeaderProps> = (props) => {
  const prefix = usePrefix();
  props = mergeProps(
    {
      isSortable: false,
      scope: "col",
      translateWithId,
    },
    props
  );
  const [, rest] = splitProps(props, [
    "class",
    "children",
    "colSpan",
    "isSortable",
    "isSortHeader",
    "onClick",
    "scope",
    "sortDirection",
    "translateWithId",
    "id",
    "ref",
  ]);
  const uniqueId = createUniqueId("table-sort");

  const childs = children(() => props.children);

  const ariaSort = () =>
    !props.isSortHeader ? "none" : sortDirections[props.sortDirection];
  const sortDescription = () =>
    props.translateWithId!("carbon.table.header.icon.description", {
      header: childs(),
      sortDirection: props.sortDirection,
      isSortHeader: !!props.isSortHeader,
      sortStates,
    });

  return (
    <th
      id={props.id}
      class={props.class}
      scope={props.scope}
      colSpan={props.colSpan}
      ref={props.ref}
      aria-sort={props.isSortable ? ariaSort() : undefined}
      {...rest}
    >
      <Show
        when={props.isSortable}
        fallback={
          <Show when={childs()}>
            <div class={`${prefix}--table-header-label`}>{childs()}</div>
          </Show>
        }
      >
        <div style={{ display: "none" }} id={uniqueId}>
          {sortDescription()}
        </div>
        <button
          type="button"
          aria-describedby={uniqueId}
          classList={{
            [`${prefix}--table-sort`]: true,
            [`${prefix}--table-sort--active`]:
              props.isSortHeader && props.sortDirection !== sortStates.NONE,
            [`${prefix}--table-sort--ascending`]:
              props.isSortHeader && props.sortDirection === sortStates.DESC,
            [props.class!]: !!props.class,
          }}
          onClick={props.onClick}
          {...rest}
        >
          <span class={`${prefix}--table-sort__flex`}>
            <div class={`${prefix}--table-header-label`}>{childs()}</div>
            <Arrow class={`${prefix}--table-sort__icon`} />
            <Arrows class={`${prefix}--table-sort__icon-unsorted`} />
          </span>
        </button>
      </Show>
    </th>
  );
};
