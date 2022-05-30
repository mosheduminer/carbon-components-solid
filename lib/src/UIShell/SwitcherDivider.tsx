import { Component, splitProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export const SwitcherDivider = (props: { class?: string }) => {
  const prefix = usePrefix();
  const [, other] = splitProps(props, ["class"]);

  return (
    <hr
      {...other}
      classList={{
        [`${prefix}--switcher__item--divider`]: true,
        [props.class!]: !!props.class,
      }}
    />
  );
};
