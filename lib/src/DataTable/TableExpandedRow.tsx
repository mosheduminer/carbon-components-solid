import { Component, splitProps } from "solid-js";
import { TableCell } from "./TableCell";
import { usePrefix } from "../internal/usePrefix";

export type TableExpandedRowProps = {
  /**
   * Specify an optional className to be applied to the container node
   */
  class?: string;

  /**
   * The width of the expanded row's internal cell
   */
  colSpan: number;
};

export const TableExpandedRow: Component<TableExpandedRowProps> = (props) => {
  let rowRef!: HTMLTableRowElement;
  const prefix = usePrefix();
  const [, rest] = splitProps(props, ["children", "class", "colSpan"]);

  const toggleParentHoverClass = (eventType: "enter" | "leave") => {
    if (rowRef && rowRef.previousElementSibling) {
      const parentNode = rowRef.previousElementSibling;
      if (eventType === "enter") {
        parentNode.classList.add(`${prefix}--expandable-row--hover`);
      } else {
        parentNode.classList.remove(`${prefix}--expandable-row--hover`);
      }
    }
  };

  return (
    <tr
      ref={rowRef}
      onMouseEnter={[toggleParentHoverClass, "enter"]}
      onMouseLeave={[toggleParentHoverClass, "leave"]}
      {...rest}
      class={`${prefix}--expandable-row`}
      classList={{ [props.class!]: !!props.class }}
      data-child-row
    >
      <TableCell colSpan={props.colSpan}>
        <div className={`${prefix}--child-row-inner-container`}>
          {props.children}
        </div>
      </TableCell>
    </tr>
  );
};
