import { Component, JSX, splitProps, mergeProps } from "solid-js";
import { createId } from "./internal/id";
import { usePrefix } from "./internal/usePrefix";

export type CheckboxProps = {
  checked?: boolean;
  class?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  id: string;
  indeterminate?: boolean;
  labelText: JSX.Element;
  onChange?: (
    evt: Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    },
    details: { checked: boolean; id: string }
  ) => any;
  title?: string;
} & Omit<JSX.HTMLAttributes<HTMLInputElement>, "onChange">;

export const Checkbox: Component<CheckboxProps> = (props) => {
  const prefix = usePrefix();
  let rest: JSX.HTMLAttributes<HTMLInputElement>;
  [props, rest] = splitProps(props, [
    "children",
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
  ]);
  props = mergeProps(
    { indeterminate: false, onChange: () => {}, title: "", id: createId() },
    props
  );

  return (
    <div
      class={`${prefix}--form-item ${prefix}--checkbox-wrapper`}
      classList={{ [props.class!]: !!props.class }}
    >
      <input
        {...rest}
        type="checkbox"
        onChange={(evt) => {
          props.onChange!(evt, {
            checked: evt.currentTarget.checked,
            id: props.id!,
          });
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
        class={`${prefix}--checkbox-label`}
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
    </div>
  );
};
