import { JSX } from "solid-js";
import { Component, splitProps } from "solid-js";

export const TableCell: Component<JSX.TdHTMLAttributes<HTMLTableCellElement>> =
  (props) => {
    const [, rest] = splitProps(props, ["children"]);
    return <td {...rest}>{props.children}</td>;
  };
