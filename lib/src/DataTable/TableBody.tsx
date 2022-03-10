import { Component, JSX, mergeProps, splitProps } from "solid-js";

export type TableBodyProps = {
  /**
   * `polite` Adjust the notification behavior of screen readers
   */
  "aria-live"?: "polite" | "assertive" | "off";
  class?: string;
} & JSX.HTMLAttributes<HTMLTableSectionElement>;

export const TableBody: Component<TableBodyProps> = (props) => {
  props = mergeProps(props, { "aria-live": "polite" });
  const [, rest] = splitProps(props, ["children", "class"]);
  return (
    <tbody class={props.class} {...rest}>
      {props.children}
    </tbody>
  );
};
