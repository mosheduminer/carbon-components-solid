import { Component, JSX, splitProps } from "solid-js";

import { MenuOption } from "./MenuOption";

export type MenuItemProps = {
  /**
   * Specify whether this MenuItem is disabled
   */
  disabled?: boolean;
  /**
   * Optional prop to specify the kind of the MenuItem
   */
  kind?: "default" | "danger";
  /**
   * Rendered label for the MenuItem
   */
  label: JSX.Element;
  /**
   * Rendered shortcut for the MenuItem
   */
  shortcut?: JSX.Element;
};

export const MenuItem: Component<MenuItemProps> = (props) => {
  const [, rest] = splitProps(props, ["children", "disabled", "kind", "label", "shortcut"]);
  return (
    <MenuOption
      {...rest}
      label={props.label}
      disabled={props.disabled}
      kind={props.kind}
      shortcut={props.shortcut}
    >
      {props.children}
    </MenuOption>
  );
};
