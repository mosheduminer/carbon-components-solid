import { mergeProps, splitProps, Component } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type TableToolbarProps = {
  /**
   * Required props for the accessibility label of the TableToolbar
   */
  "aria-label"?: string;
  "aria-labelledby"?: string;

  /**
   * `normal` Change the row height of table
   */
  size?: "sm" | "lg";
};

export const TableToolbar: Component<TableToolbarProps> = (props) => {
  const prefix = usePrefix();
  props = mergeProps(
    {
      "aria-label": "data table toolbar",
    },
    props
  );
  const [, rest] = splitProps(props, ["size", "children"]);
  return (
    <section
      {...rest}
      classList={{
        [`${prefix}--table-toolbar`]: true,
        [`${prefix}--table-toolbar--${props.size}`]: !!props.size,
      }}
    >
      {props.children}
    </section>
  );
};
