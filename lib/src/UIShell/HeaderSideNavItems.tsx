import { settings } from "carbon-components";
import { Component, JSX, mergeProps } from "solid-js";

const { prefix } = settings;

export type HeaderSideNavItemsProps = {
  class?: string;
  hasDivider?: boolean;
};

export const HeaderSideNavItems: Component<HeaderSideNavItemsProps> = (
  props
) => {
  props = mergeProps({ hasDivider: false }, props);
  return (
    <div
      classList={{
        [`${prefix}--side-nav__header-navigation`]: true,
        [`${prefix}--side-nav__header-divider`]: props.hasDivider,
      }}
      class={props.class}
    >
      {props.children}
    </div>
  );
};
