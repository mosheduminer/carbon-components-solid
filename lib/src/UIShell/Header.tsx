import { settings } from "carbon-components";
import { Component, JSX, splitProps } from "solid-js";

const { prefix } = settings;

export type HeaderProps = {
  class?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
} & JSX.HTMLAttributes<HTMLElement>;

export const Header: Component<HeaderProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLElement>;
  [props, rest] = splitProps(props, ["children", "class"]);
  if (!rest["aria-label"] && !rest["aria-labelledby"]) {
    throw new Error("must specify either `aria-label` or `aria-labelledby`");
  }
  return (
    <header
      class={`${prefix}--header`}
      {...rest}
      classList={{ [props.class!]: !!props.class }}
    >
      {props.children}
    </header>
  );
};
