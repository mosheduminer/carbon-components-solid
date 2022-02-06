///TODO code for focus management was only partially present, the rest was removed.
import { Component, splitProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type HeaderNavigationProps = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  class?: string;
};

export const HeaderNavigation: Component<HeaderNavigationProps> = (props) => {
  if (
    typeof props["aria-label"] === "undefined" &&
    typeof props["aria-labelledby"] === "undefined"
  ) {
    throw Error(
      "HeaderNavigation: `aria-label` and `aria-labelledby` are both undefined"
    );
  }
  const prefix = usePrefix();

  const [, rest] = splitProps(props, [
    "aria-label",
    "aria-labelledby",
    "children",
    "class",
  ]);

  return (
    <nav
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      {...rest}
      class={`${prefix}--header__nav`}
      classList={{ [props.class!]: !!props.class }}
    >
      <ul
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        class={`${prefix}--header__menu-bar`}
      >
        {props.children}
      </ul>
    </nav>
  );
};
