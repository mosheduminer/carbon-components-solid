import { Component, mergeProps, JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { usePrefix } from "./internal/usePrefix";

export type AspectRatioProps = {
  as?: Component | string;
  class?: string;
  ratio?: "16x9" | "9x16" | "2x1" | "1x2" | "4x3" | "3x4" | "1x1";
} & JSX.HTMLAttributes<HTMLElement>;

export const AspectRatio: Component<AspectRatioProps> = (props) => {
  const prefix = usePrefix();
  let rest: JSX.HTMLAttributes<HTMLElement>;
  [props, rest] = splitProps(props, ["class", "children", "as", "ratio"]);
  props = mergeProps({ as: "div", ratio: "1x1" }, props);
  return (
    <Dynamic
      component={props.as!}
      classList={{ [props.class!]: !!props.class }}
      class={`${prefix}--aspect-ratio ${prefix}--aspect-ratio--${props.ratio}`}
      {...rest}
    >
      {props.children}
    </Dynamic>
  );
};
