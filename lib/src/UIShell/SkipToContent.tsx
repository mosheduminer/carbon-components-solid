import { Component, JSX, splitProps, mergeProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type SkipToContentProps = {
  class?: string;
  href?: string;
  tabIndex?: string | number;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export const SkipToContent: Component<SkipToContentProps> = (props) => {
  const [, rest] = splitProps(props, ["class", "href", "tabIndex", "children"]);
  props = mergeProps(
    {
      children: "Skip to main content",
      href: "#main-content",
      tabIndex: "0",
    },
    props
  );
  const prefix = usePrefix();
  return (
    <a
      {...rest}
      class={`${prefix}--skip-to-content`}
      classList={{ [props.class!]: !!props.class }}
      href={props.href}
      tabIndex={props.tabIndex}
    >
      {props.children}
    </a>
  );
};
