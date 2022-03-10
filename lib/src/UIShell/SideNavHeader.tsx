import { SideNavIcon } from "./SideNavIcon";
import { usePrefix } from "../internal/usePrefix";
import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";

export type SideNavHeaderProps = {
  class?: string;
  renderIcon: Component;
};

export const SideNavHeader: Component<SideNavHeaderProps> = (props) => {
  const prefix = usePrefix();
  return (
    <header
      class={`${prefix}--side-nav__header`}
      classList={{ [props.class!]: !!props.class }}
    >
      <SideNavIcon>
        <Dynamic component={props.renderIcon} />
      </SideNavIcon>
      {props.children}
    </header>
  );
};
