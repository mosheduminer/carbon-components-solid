import settings from "carbon-components/es/globals/js/settings";
import { Component, JSX, splitProps, mergeProps } from "solid-js";

const { prefix } = settings;

export type SelectItemGroupProps = {
  class?: string;
  disabled?: boolean;
  label: string;
} & JSX.OptgroupHTMLAttributes<HTMLOptGroupElement>;

export const SelectItemGroup: Component<SelectItemGroupProps> = (props) => {
  let other: JSX.OptgroupHTMLAttributes<HTMLOptGroupElement>;
  [props, other] = splitProps(props, [
    "class",
    "disabled",
    "children",
    "label",
  ]);
  props = mergeProps(
    {
      disabled: false,
      label: undefined,
    },
    props
  );

  return (
    <optgroup
      class={`${prefix}--select-optgroup`}
      classList={{ [props.class!]: !!props.class }}
      label={props.label}
      disabled={props.disabled}
      {...other}
    >
      {props.children}
    </optgroup>
  );
};
