import { JSX, Component, splitProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type SideNavLinkTextProps = {
  /**
   * Provide the content for the link text
   */
  children: JSX.Element;
  /**
   * Provide an optional class to be applied to the containing node
   */
  class?: string;
} & JSX.HTMLAttributes<HTMLSpanElement>;

export const SideNavLinkText: Component<SideNavLinkTextProps> = (props) => {
  const prefix = usePrefix();
  const [, rest] = splitProps(props, ["children", "class"]);
  return (
    <span
      {...rest}
      class={`${prefix}--side-nav__link-text`}
      classList={{
        [props.class!]: !!props.class,
      }}
    >
      {props.children}
    </span>
  );
};
