import { Link, LinkProps } from "./Link";
import { usePrefix } from "../internal/usePrefix";
import { Component, JSX, splitProps } from "solid-js";

export type HeaderMenuItemPropsWithoutLinkProps = {
  "aria-current"?: JSX.AriaAttributes["aria-current"];
  children?: JSX.Element;
  class?: string;
  isCurrentPage?: boolean;
  ref?: (node: HTMLElement) => any | HTMLElement;
  role?: JSX.HTMLAttributes<HTMLLIElement>["role"];
};

export type HeaderMenuItemProps = HeaderMenuItemPropsWithoutLinkProps &
  LinkProps;

export const HeaderMenuItem: Component<HeaderMenuItemProps> = (props) => {
  const prefix = usePrefix();
  let rest: LinkProps;
  [, rest] = splitProps(props, [
    "aria-current",
    "children",
    "class",
    "isCurrentPage",
    "ref",
    "role",
  ]);

  return (cb?: (ref: HTMLElement) => any) => (
    <li class={props.class} role={props.role}>
      <Link
        {...rest}
        aria-current={props["aria-current"]}
        class={`${prefix}--header__menu-item`}
        classList={{
          // We set the current class only if `isCurrentPage` is passed in and we do
          // not have an `aria-current="page"` set for the breadcrumb item
          [`${prefix}--header__menu-item--current`]:
            props.isCurrentPage && props["aria-current"] !== "page",
        }}
        ref={(el) => {
          props.ref?.(el);
          cb?.(el);
        }}
        tabIndex={0}
      >
        <span class={`${prefix}--text-truncate--end`}>{props.children}</span>
      </Link>
    </li>
  );
};
