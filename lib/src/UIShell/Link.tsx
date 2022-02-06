import { Component, JSX, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export type LinkProps = {
  element?: string | Component;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: Component<LinkProps> = (props) => {
  props = mergeProps({ element: "a" }, props);
  const [, rest] = splitProps(props, ["element", "ref"]);
  return <Dynamic component={props.element} ref={props.ref} {...rest} />;
};
