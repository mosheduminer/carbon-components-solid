import { Component, JSX, splitProps } from "solid-js";
import { Menu20 } from "../icons/icons/Menu20";
import { Close20 } from "../icons/icons/Close20";
import { usePrefix } from "../internal/usePrefix";

export type HeaderMenuButtonProps = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  class?: string;
  isActive?: boolean;
  isCollapsible?: boolean;
  onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  renderMenuIcon?: Component;
  renderCloseIcon?: Component;
} & JSX.HTMLAttributes<HTMLButtonElement>;

export const HeaderMenuButton: Component<HeaderMenuButtonProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLButtonElement>;
  [props, rest] = splitProps(props, [
    "aria-label",
    "aria-labelledby",
    "class",
    "isActive",
    "isCollapsible",
    "onClick",
    "renderCloseIcon",
    "renderMenuIcon",
  ]);
  if (!props["aria-label"] && !props["aria-labelledby"]) {
    throw new Error("must specify either `aria-label` or `aria-labelledby`");
  }
  const prefix = usePrefix();
  const menuIcon = () =>
    props.renderMenuIcon ? <props.renderMenuIcon /> : <Menu20 />;
  const closeIcon = () =>
    props.renderCloseIcon ? <props.renderCloseIcon /> : <Close20 />;

  return (
    <button
      {...rest}
      classList={{
        [props.class!]: !!props.class,
        [`${prefix}--header__action`]: true,
        [`${prefix}--header__menu-trigger`]: true,
        [`${prefix}--header__action--active`]: props.isActive,
        [`${prefix}--header__menu-toggle`]: true,
        [`${prefix}--header__menu-toggle__hidden`]: !props.isCollapsible,
      }}
      title={props["aria-label"]}
      type="button"
      onClick={props.onClick}
    >
      {props.isActive ? closeIcon() : menuIcon()}
    </button>
  );
};
