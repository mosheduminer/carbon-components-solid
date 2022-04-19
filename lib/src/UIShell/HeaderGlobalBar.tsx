import { Component, JSX } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export const HeaderGlobalBar: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const prefix = usePrefix();
  return (
    <div class={`${prefix}--header__global`} {...props}>
      {props.children}
    </div>
  );
};
