import {
  Component,
  createMemo,
  createUniqueId,
  JSX,
  mergeProps,
  splitProps,
} from "solid-js";
import { usePrefix } from "./internal/usePrefix";
import { Text } from "./Text";

export type RadioButtonProps = {
  /**
   * Specify whether the <RadioButton> is currently checked
   */
  checked?: boolean;

  /**
   * Provide an optional className to be applied to the containing node
   */
  class?: string;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Provide a unique id for the underlying `<input>` node
   */
  id?: string;

  /**
   * Provide where label text should be placed
   * NOTE: `top`/`bottom` are deprecated
   */
  labelPosition?: "right" | "left";

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: JSX.Element;

  /**
   * Provide a name for the underlying `<input>` node
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onInput?: (
    value: number | string,
    name: string | undefined,
    evt: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => any;

  /**
   * Provide a handler that is invoked when a user clicks on the control
   */
  onClick?: JSX.EventHandlerUnion<HTMLInputElement, MouseEvent>;

  /**
   * Specify the value of the <RadioButton>
   */
  value: number | string;
} & JSX.HTMLAttributes<HTMLInputElement>;

export const RadioButton: Component<RadioButtonProps> = (props) => {
  props = mergeProps(
    {
      labelText: "",
      labelPosition: "right",
      onChange: () => {},
      value: "",
    },
    props
  );
  const [, rest] = splitProps(props, [
    "class",
    "labelText",
    "labelPosition",
    "hideLabel",
  ]);
  const prefix = usePrefix();

  const uid = createMemo(() => props.id || createUniqueId());

  return (
    <div
      class={`${prefix}--radio-button-wrapper`}
      classList={{
        [`${prefix}--radio-button-wrapper--label-${props.labelPosition}`]:
          props.labelPosition !== "right",
        [props.class!]: !!props.class,
      }}
    >
      <input
        {...rest}
        type="radio"
        class={`${prefix}--radio-button`}
        onInput={(evt) => {
          props.onInput?.(props.value, props.name, evt);
        }}
        id={uid()}
      />
      <label for={uid()} class={`${prefix}--radio-button__label`}>
        <span class={`${prefix}--radio-button__appearance`} />
        {props.labelText && (
          <Text
            classList={{
              [`${prefix}--visually-hidden`]: props.hideLabel,
            }}
          >
            {props.labelText}
          </Text>
        )}
      </label>
    </div>
  );
};
