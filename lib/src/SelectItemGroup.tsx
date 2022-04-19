import { Component, JSX, splitProps, mergeProps } from "solid-js";
import { usePrefix } from "./internal/usePrefix";

export type SelectItemGroupProps = {
  class?: string;
  disabled?: boolean;
  label: string;
} & JSX.OptgroupHTMLAttributes<HTMLOptGroupElement>;

export const SelectItemGroup: Component<SelectItemGroupProps> = (props) => {
  const prefix = usePrefix();
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
