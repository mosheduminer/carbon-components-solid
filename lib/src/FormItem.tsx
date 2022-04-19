import { Component, JSX } from "solid-js";
import { usePrefix } from "./internal/usePrefix";

export type FormItemProps = JSX.HTMLAttributes<HTMLDivElement>;

export const FormItem: Component<FormItemProps> = (props) => {
  const prefix = usePrefix();
  return (
    <div class={`${prefix}--form-item`} {...props}>
      {props.children}
    </div>
  );
};
