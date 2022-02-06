import { Component, mergeProps, splitProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";
import { Link, LinkProps } from "../Link";

export type HeaderNameProps = {
  class?: string;
  href: string;
  prefix?: string;
} & LinkProps;

export const HeaderName: Component<HeaderNameProps> = (props) => {
  let rest: Omit<LinkProps, "href">;
  props = mergeProps({ prefix: "IBM" }, props);
  [props, rest] = splitProps(props, ["children", "class", "href", "prefix"]);
  const selectorPrefix = usePrefix();
  return (
    <Link
      {...rest}
      class={`${selectorPrefix}--header__name`}
      classList={{ [props.class!]: !!props.class }}
      href={props.href}
    >
      {props.prefix && (
        <>
          <span class={`${selectorPrefix}--header__name--prefix`}>
            {props.prefix}
          </span>
          &nbsp;
        </>
      )}
      {props.children}
    </Link>
  );
};
