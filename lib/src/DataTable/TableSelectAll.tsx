import { Component, JSX, mergeProps } from "solid-js";
import { InlineCheckbox } from "../InlineCheckbox";
import { usePrefix } from "../internal/usePrefix";

export type TableSelectAllProps = {
  /**
   * Specify the aria label for the underlying input control
   */
  ariaLabel: string;
  /**
   * Specify whether all items are selected, or not
   */
  checked: boolean;
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  class?: string;
  /**
   * Specify whether the checkbox input should be disabled
   */
  disabled?: boolean;
  /**
   * Provide an `id` for the underlying input control
   */
  id: string;
  /**
   * Specify whether the selection only has a subset of all items
   */
  indeterminate?: boolean;
  /**
   * Provide a `name` for the underlying input control
   */
  name: string;
  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: JSX.EventHandlerUnion<HTMLInputElement, MouseEvent>;
};

export const TableSelectAll: Component<TableSelectAllProps> = (props) => {
  const prefix = usePrefix();
  props = mergeProps(
    {
      "aria-label": "Select all rows in the table",
    },
    props
  );
  return (
    <th
      scope="col"
      classList={{
        [`${prefix}--table-column-checkbox`]: true,
        [props.class!]: !!props.class,
      }}
    >
      <InlineCheckbox
        aria-label={props.ariaLabel}
        checked={props.checked}
        id={props.id}
        indeterminate={props.indeterminate}
        name={props.name}
        onClick={props.onSelect}
        disabled={props.disabled}
      />
    </th>
  );
};
