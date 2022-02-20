import { Component, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { RadioButton } from "../RadioButton";
import { InlineCheckbox } from "../InlineCheckbox";
import { usePrefix } from "../internal/usePrefix";

export type TableSelectRowProps = {
  /**
   * Specify the aria label for the underlying input control
   */
  "aria-label": string;
  /**
   * Specify whether all items are selected, or not
   */
  checked: boolean;
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  class?: string;
  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;
  /**
   * Provide an `id` for the underlying input control
   */
  id: string;
  /**
   * Provide a `name` for the underlying input control
   */
  name: string;
  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?: JSX.EventHandlerUnion<HTMLElement, Event>;
  /**
   * Provide a handler to listen to when a user initiates a selection request
   */
  onSelect: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  radio?: boolean;
};

export const TableSelectRow: Component<TableSelectRowProps> = (props) => {
  const prefix = usePrefix();
  return (
    <td
      class={`${prefix}--table-column-checkbox`}
      classList={{
        [props.class!]: !!props.class,
        [`${prefix}--table-column-radio`]: props.radio,
      }}
    >
      <Dynamic
        //@ts-ignore
        component={props.radio ? RadioButton : InlineCheckbox}
        id={props.id}
        name={props.name}
        onClick={props.onSelect}
        onChange={props.onChange}
        checked={props.checked}
        disabled={props.disabled}
        labelText={props.radio && props["aria-label"]}
        hideLabel={props.radio && true}
        aria-label={props.radio && props["aria-label"]}
      />
    </td>
  );
};
