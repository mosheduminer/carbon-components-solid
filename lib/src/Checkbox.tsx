import { Component, JSX, splitProps, mergeProps } from "solid-js";
import { settings } from "carbon-components";
import { createId } from "./internal/id";
const { prefix } = settings;

export type CheckboxProps = {
  class?: string;
  checked: boolean;
  defaultChecked: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  id?: string;
  indeterminate?: boolean;
  labelText?: JSX.Element;
  onChange: (
    evt: Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    },
    details: { checked: boolean; id: string }
  ) => any;
  title?: string;
  wrapperClass?: string;
} & JSX.HTMLAttributes<HTMLInputElement>;

export const Checkbox: Component<CheckboxProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLInputElement>;
  [props, rest] = splitProps(props, [
    "class",
    "checked",
    "defaultChecked",
    "disabled",
    "hideLabel",
    "id",
    "indeterminate",
    "labelText",
    "onChange",
    "title",
    "wrapperClass",
  ]);
  props = mergeProps(
    { indeterminate: false, onChange: () => { }, title: "", id: createId() },
    props
  );

  return (<div class={props.wrapperClass}>
    <input
      {...rest}
      type="checkbox"
      onChange={(evt) => {
        props.onChange(evt, { checked: evt.currentTarget.checked, id: props.id! });
      }}
      class={`${prefix}--checkbox`}
      id={props.id}
      ref={(el) => {
        if (el) {
          el.indeterminate = !!props.indeterminate;
        }
        if (typeof props.ref === "function") {
          props.ref(el);
        } else {
          props.ref = el;
        }
      }}
    />
    <label
      for={props.id}
      class={`${prefix}--form-item ${prefix}--checkbox-wrapper`}
      classList={{ [props.wrapperClass!]: !!props.wrapperClass }}
      title={props.title || undefined}
    >
      <span
        class={`${prefix}--checkbox-label-text`}
        classList={{
          [`${prefix}--visually-hidden`]: props.hideLabel,
        }}
      >
        {props.labelText}
      </span>
    </label>
  </div>);
};
