import { Component, JSX } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type SwitcherProps = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  class?: string;
  ref?: JSX.HTMLAttributes<HTMLUListElement>["ref"];
};

export const Switcher: Component<SwitcherProps> = (props) => {
  const prefix = usePrefix();

  return (
    <ul
      ref={props.ref}
      classList={{
        [`${prefix}--switcher`]: true,
        [props.class!]: !!props.class,
      }}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
    >
      {props.children}
    </ul>
  );
};
