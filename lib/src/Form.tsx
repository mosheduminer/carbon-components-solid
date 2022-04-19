import { Component, JSX, splitProps } from "solid-js";
import { usePrefix } from "./internal/usePrefix";

export type FormProps = {
  class?: string;
} & JSX.HTMLAttributes<HTMLFormElement>;

export const Form: Component<FormProps> = (props) => {
  const prefix = usePrefix();
  let rest: JSX.HTMLAttributes<HTMLFormElement>;
  [props, rest] = splitProps(props, ["class", "children"]);
  return (
    <form
      class={`${prefix}--form`}
      classList={{ [props.class!]: !!props.class }}
      {...rest}
    >
      {" "}
      {props.children}{" "}
    </form>
  );
};
