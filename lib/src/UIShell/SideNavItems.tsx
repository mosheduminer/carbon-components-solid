import { Component, JSX } from "solid-js";
import { usePrefix } from "../internal/usePrefix";
import { ExpandedContext } from "./expandedContext";

export type SideNavItemsProps = {
  children: JSX.Element;
  class?: string;
  isSideNavExpanded?: boolean;
};

export const SideNavItems: Component<SideNavItemsProps> = (props) => {
  const prefix = usePrefix();
  return (
    <ExpandedContext.Provider value={() => props.isSideNavExpanded}>
      <ul
        classList={{ [props.class!]: !!props.class }}
        class={`${prefix}--side-nav__items`}
      >
        {props.children}
      </ul>
    </ExpandedContext.Provider>
  );
};
