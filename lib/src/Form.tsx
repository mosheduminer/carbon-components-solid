import { Component, JSX, splitProps } from "solid-js";
import settings from "carbon-components/es/globals/js/settings";

const { prefix } = settings;

export type FormProps = {
  class?: string;
} & JSX.HTMLAttributes<HTMLFormElement>;

export const Form: Component<FormProps> = (props) => {
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
