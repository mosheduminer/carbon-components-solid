import { Component, JSX, splitProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type HeaderPanelProps = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  class?: string;
  /**
   * Specify whether the panel is expanded
   */
  expanded?: boolean;
  ref?: HTMLDivElement | ((arg: HTMLDivElement) => any);
} & JSX.HTMLAttributes<HTMLDivElement>;

export const HeaderPanel: Component<HeaderPanelProps> = (props) => {
  const prefix = usePrefix();
  const [, rest] = splitProps(props, [
    "aria-label",
    "aria-labelledby",
    "class",
    "children",
    "expanded",
    "ref",
  ]);
  return (
    <div
      {...rest}
      classList={{
        [`${prefix}--header-panel`]: true,
        [`${prefix}--header-panel--expanded`]: !!props.expanded,
        [props.class!]: !!props.class,
      }}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      ref={props.ref}
    >
      {props.children}
    </div>
  );
};
