import { Component, JSX, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { usePrefix } from "../internal/usePrefix";

export type ContentProps = {
  class?: string;
  component?:
    | string
    | Component<{ class: string; classList: { [arg: string]: boolean } }>;
} & JSX.HTMLAttributes<HTMLElement>;

export const Content: Component<ContentProps> = (props) => {
  const prefix = usePrefix();
  props = mergeProps({ component: "main" }, props);
  const [, rest] = splitProps(props, ["class", "component"]);
  return (
    <Dynamic
      {...rest}
      class={`${prefix}--content`}
      classList={{ [props.class!]: !!props.class }}
      component={props.component}
    >
      {props.children}
    </Dynamic>
  );
};
