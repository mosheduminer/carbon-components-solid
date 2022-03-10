import {
  Component,
  createEffect,
  on,
  splitProps,
} from "solid-js";
import { useContext } from "solid-js";
import { SideNavLinkText } from "./SideNavLinkText";
import { Link, LinkProps } from "./Link";
import { usePrefix } from "../internal/usePrefix";
import { ActiveChildContext } from "./SideNavMenu";

export type SideNavMenuItemProps = {
  class?: string;
  isActive?: boolean;
  ref?: HTMLElement | ((el: HTMLElement) => any);
} & LinkProps;

export const SideNavMenuItem: Component<SideNavMenuItemProps> = (props) => {
  const prefix = usePrefix();
  const context = useContext(ActiveChildContext);
  if (context) {
    if (props.isActive) context[1]((v) => v + 1);
    createEffect(
      on(
        () => props.isActive,
        () => {
          if (props.isActive) {
            context[1]((v) => v + 1);
          } else context[1]((v) => v - 1);
        },
        { defer: true }
      )
    );
  }
  const [, rest] = splitProps(props, ["class", "isActive", "ref", "children"]);
  return (
    <li
      class={`${prefix}--side-nav__menu-item`}
      classList={{ [props.class!]: !!props.class }}
    >
      <Link
        {...rest}
        classList={{
          [`${prefix}--side-nav__link`]: true,
          [`${prefix}--side-nav__link--current`]: props.isActive,
        }}
        ref={props.ref}
      >
        <SideNavLinkText>{props.children}</SideNavLinkText>
      </Link>
    </li>
  );
};
