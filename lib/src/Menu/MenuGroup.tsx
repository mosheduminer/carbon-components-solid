import type { Component, JSX } from "solid-js";

export type MenuGroupProps = {
  /**
   * Rendered label for the MenuGroup
   */
  label: string;
};

export const MenuGroup: Component<MenuGroupProps> = (props) => {
  return (
    <li role="none">
      <ul role="group" aria-label={props.label}>
        {props.children}
      </ul>
    </li>
  );
}
