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
  const prefix = usePrefix();
  return (
    <Link
      {...rest}
      classList={{
        [props.class!]: !!props.class,
        [`${prefix}--header__name`]: true,
      }}
      href={props.href}
    >
      {props.prefix && (
        <>
          <span class={`${prefix}--header__name--prefix`}>{props.prefix}</span>
          &nbsp;
        </>
      )}
      {props.children}
    </Link>
  );
};
