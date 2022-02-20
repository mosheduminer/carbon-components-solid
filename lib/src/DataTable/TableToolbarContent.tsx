import { JSX } from "solid-js";
import { Component, splitProps } from "solid-js";

export const TableToolbarContent: Component<
  JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [, rest] = splitProps(props, ["children"]);
  return <div {...rest}>{props.children}</div>;
};
