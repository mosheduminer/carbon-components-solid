import type { JSX } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type SideNavItemProps = {
  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container
   */
  children: JSX.Element;
  class?: string;
  /**
   * Specify if this is a large variation of the SideNavItem
   */
  large?: boolean;
};

export const SideNavItem = (props: SideNavItemProps) => {
  const prefix = usePrefix();
  return (
    <li
      classList={{
        [`${prefix}--side-nav__item`]: true,
        [`${prefix}--side-nav__item--large`]: props.large,
        [props.class!]: !!props.class,
      }}
    >
      {props.children}
    </li>
  );
};
