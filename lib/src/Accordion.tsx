import { Component, For, mergeProps, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { usePrefix } from "./internal/usePrefix";

export type AccordionProps = {
  align?: "start" | "end";
  class?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
} & JSX.HTMLAttributes<HTMLLIElement>;

export const Accordion: Component<AccordionProps> = (props) => {
  props = mergeProps({ align: "end" }, props);
  const prefix = usePrefix();

  return (
    <ul
      class={`${prefix}--accordion`}
      classList={{
        [props.class as string]: !!props.class,
        [`${prefix}--accordion--${props.align}`]: props.align !== undefined,
        [`${prefix}--accordion--${props.size}`]: props.size !== undefined,
      }}
    >
      {props.disabled ? (
        <For each={props.children as Component[]}>
          {(child) => <Dynamic component={child} />}
        </For>
      ) : (
        props.children
      )}
    </ul>
  );
};
