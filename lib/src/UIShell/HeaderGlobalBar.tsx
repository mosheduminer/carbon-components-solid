import { settings } from "carbon-components";
import { Component, JSX } from "solid-js";

const { prefix } = settings;

export const HeaderGlobalBar: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div class={`${prefix}--header__global`} {...props}>
      {props.children}
    </div>
  );
};
