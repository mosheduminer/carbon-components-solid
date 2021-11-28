import { Component, JSX } from "solid-js";
import { settings } from "carbon-components";

const { prefix } = settings;

export type FormItemProps = JSX.HTMLAttributes<HTMLDivElement>;

export const FormItem: Component<FormItemProps> = (props) => {
  return (
    <div class={`${prefix}--form-item`} {...props}>
      {props.children}
    </div>
  );
};
