import { Component, JSX, splitProps } from "solid-js";
import { usePrefix } from "./internal/usePrefix";

export type FormLabelProps = {
  id?: string;
  class?: string;
} & JSX.HTMLAttributes<HTMLLabelElement>;

export const FormLabel: Component<FormLabelProps> = (props) => {
  const prefix = usePrefix();
  let rest: JSX.HTMLAttributes<HTMLLabelElement>;
  [props, rest] = splitProps(props, ["class", "children", "id"]);
  return (
    <label
      for={props.id}
      class={`${prefix}--label`}
      classList={{ [props.class!]: !!props.class }}
      {...rest}
    >
      {props.children}
    </label>
  );
};
