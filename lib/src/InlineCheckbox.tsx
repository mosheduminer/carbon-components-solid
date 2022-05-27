import { Component, createEffect, JSX, mergeProps } from "solid-js";
import { usePrefix } from "./internal/usePrefix";

export type InlineCheckboxProps = {
  /**
   * Specify the label for the control
   */
  "aria-label": string;

  /**
   * Specify whether the underlying control is checked, or not
   */
  checked?: boolean;

  /**
   * Specify whether the underlying input control should be disabled
   */
  disabled?: boolean;

  /**
   * Provide an `id` for the underlying input control
   */
  id: string;

  /**
   * Specify whether the control is in an indterminate state
   */
  indeterminate?: boolean;

  /**
   * Provide a `name` for the underlying input control
   */
  name: string;

  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onInput?: (checked: boolean, id: string, event: InputEvent & {
    currentTarget: HTMLInputElement;
    target: Element;
  }) => any;

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick?: JSX.EventHandlerUnion<HTMLInputElement, MouseEvent>;

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown?: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent>;

  ref?: HTMLInputElement;

  /**
   * Provide an optional tooltip for the InlineCheckbox
   */
  title?: string;
};

export const InlineCheckbox: Component<InlineCheckboxProps> = (props) => {
  props = mergeProps({ disabled: false }, props);
  const prefix = usePrefix();
  let ref!: HTMLInputElement;

  createEffect(() => {
    ref.indeterminate = !!props.indeterminate;
  });

  return (
    <div class={`${prefix}--checkbox--inline`}>
      <input
        aria-checked={props.indeterminate && "mixed"}
        checked={props.indeterminate ? false : props.checked}
        class={`${prefix}--checkbox`}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onClick={props.onClick}
        onInput={(evt) =>
          props.onInput?.(evt.currentTarget.checked, props.id, evt)
        }
        onKeyDown={props.onKeyDown}
        ref={(el) => {
          //@ts-ignore
          props.ref && props.ref(el);
          ref = el;
        }}
        type="checkbox"
      />
      {
        <label
          for={props.id}
          class={`${prefix}--checkbox-label`}
          aria-label={props["aria-label"]}
          title={props.title}
          onClick={(evt) => {
            evt.stopPropagation();
          }}
        />
      }
    </div>
  );
};
