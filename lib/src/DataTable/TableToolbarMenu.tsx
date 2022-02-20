import { settings } from "carbon-components";
import { OverflowMenu } from "../OverflowMenu";
import { Settings16 } from "../icons/Settings16";
import { Component, mergeProps, splitProps } from "solid-js";

const { prefix } = settings;

export type TableToolbarMenuProps = {
  /**
   * Provide an optional class name for the toolbar menu
   */
  class?: string;
  /**
   * The description of the menu icon.
   */
  iconDescription?: string;
  /**
   * Optional prop to allow overriding the default menu icon
   */
  renderIcon?: Component;
};

export const TableToolbarMenu: Component<TableToolbarMenuProps> = (props) => {
  props = mergeProps(
    {
      renderIcon: Settings16,
      iconDescription: "Settings",
    },
    props
  );
  const [, rest] = splitProps(props, [
    "children",
    "class",
    "iconDescription",
    "renderIcon",
  ]);
  return (
    <OverflowMenu
      class={`${prefix}--toolbar-action ${prefix}--overflow-menu`}
      classList={{ [props.class!]: !!props.class }}
      aria-label={props.iconDescription}
      renderIcon={props.renderIcon!}
      title={props.iconDescription}
      {...rest}
    >
      {props.children}
    </OverflowMenu>
  );
};
