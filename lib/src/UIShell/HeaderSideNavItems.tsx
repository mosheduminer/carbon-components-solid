import { Component, mergeProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type HeaderSideNavItemsProps = {
  class?: string;
  hasDivider?: boolean;
};

export const HeaderSideNavItems: Component<HeaderSideNavItemsProps> = (
  props
) => {
  const prefix = usePrefix();
  props = mergeProps({ hasDivider: false }, props);
  return (
    <ul
      classList={{
        [props.class!]: !!props.class,
        [`${prefix}--side-nav__header-navigation`]: true,
        [`${prefix}--side-nav__header-divider`]: props.hasDivider,
      }}
    >
      {props.children}
    </ul>
  );
};
