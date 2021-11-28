import { settings } from "carbon-components";
import { Component, JSX, mergeProps, splitProps } from "solid-js";

const { prefix } = settings;

export type FormGroupProps = {
  class?: string;
  hasMargin?: boolean;
  invalid?: boolean;
  legendId?: string;
  legendText: string;
  message?: boolean;
  messageText?: string;
} & JSX.HTMLAttributes<HTMLFieldSetElement>;

export const FormGroup: Component<FormGroupProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLFieldSetElement>;
  [props, rest] = splitProps(props, [
    "class",
    "children",
    "hasMargin",
    "invalid",
    "legendId",
    "legendText",
    "message",
    "messageText",
  ]);
  props = mergeProps(
    { invalid: false, message: false, messageText: "", hasMargin: true },
    props
  );
  return (
    <fieldset
      data-invalid={props.invalid ? "" : undefined}
      class={`${prefix}--fieldset`}
      classList={{ [`${prefix}--fieldset--no-margin`]: !props.hasMargin }}
      {...rest}
      aria-labelledby={rest["aria-labelledby"] || props.legendId}
    >
      <legend
        class={`${prefix}--label`}
        classList={{ [props.class!]: !!props.class }}
        id={props.legendId || rest["aria-labelledby"]}
      >
        {props.legendText}
      </legend>
      {props.children}
      {props.message ? (
        <div class={`${prefix}--form__requirements`}>{props.messageText}</div>
      ) : null}
    </fieldset>
  );
};
