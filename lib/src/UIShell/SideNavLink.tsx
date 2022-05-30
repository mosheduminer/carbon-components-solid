import { Link, LinkProps } from "./Link";
import { SideNavIcon } from "./SideNavIcon";
import { SideNavItem } from "./SideNavItem";
import { SideNavLinkText } from "./SideNavLinkText";
import { usePrefix } from "../internal/usePrefix";
import { Component, JSX, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export type SideNavLinkProps = {
  children: JSX.Element;
  class?: string;
  element?: string | Component;
  isActive?: boolean;
  isSideNavExpanded?: boolean;
  large?: boolean;
  renderIcon: Component;
  ref?: HTMLElement | ((el: HTMLElement) => any);
} & LinkProps;

export const SideNavLink: Component<SideNavLinkProps> = (props) => {
  props = mergeProps(
    {
      element: "a",
      large: false,
    },
    props
  );
  const [, rest] = splitProps(props, [
    "children",
    "class",
    "element",
    "isActive",
    "isSideNavExpanded",
    "large",
    "renderIcon",
    "ref",
  ]);
  const prefix = usePrefix();

  return (
    <SideNavItem large={props.large}>
      <Link
        element={props.element}
        {...rest}
        classList={{
          [`${prefix}--side-nav__link`]: true,
          [`${prefix}--side-nav__link--current`]: props.isActive,
          [props.class!]: !!props.class,
        }}
        ref={props.ref}
      >
        <SideNavIcon small>
          <Dynamic component={props.renderIcon} />
        </SideNavIcon>
        <SideNavLinkText>{props.children}</SideNavLinkText>
      </Link>
    </SideNavItem>
  );
};
