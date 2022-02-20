import { Component, JSX, splitProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type TableRowProps = {
  class?: string;
  isSelected?: boolean;
} & JSX.HTMLAttributes<HTMLTableRowElement>;

export const TableRow: Component<TableRowProps> = (props) => {
  const prefix = usePrefix();
  const [, rest] = splitProps(props, ["isSelected", "class", "children"]);
  return (
    <tr
      classList={{
        [`${prefix}--data-table--selected`]: props.isSelected,
        [props.class!]: !!props.class,
      }}
      {...rest}
    >
      {props.children}
    </tr>
  );
};
