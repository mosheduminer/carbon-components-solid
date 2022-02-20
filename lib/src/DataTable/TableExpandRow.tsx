import { Component, splitProps, JSX } from "solid-js";
import { usePrefix } from "../internal/usePrefix";
import { ChevronRight16 } from "../icons/ChevronRight16";
import { TableCell } from "./TableCell";

export type TableExpandRowProps = {
  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel: string;
  class?: string;
  /**
   * The id of the matching th node in the table head. Addresses a11y concerns outlined here: https://www.ibm.com/able/guidelines/ci162/info_and_relationships.html and https://www.w3.org/TR/WCAG20-TECHS/H43
   */
  expandHeader?: string;

  /**
   * The description of the chevron right icon, to be put in its SVG `<title>` element.
   */
  expandIconDescription?: string;

  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExpandedRow` work together
   */
  isExpanded: boolean;

  /**
   * Specify if the row is selected
   */
  isSelected?: boolean;

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
};

export const TableExpandRow: Component<TableExpandRowProps> = (props) => {
  const prefix = usePrefix();
  const previousValue = () => (props.isExpanded ? "collapsed" : undefined);
  const [, rest] = splitProps(props, [
    "ariaLabel",
    "class",
    "children",
    "isExpanded",
    "onExpand",
    "expandIconDescription",
    "isSelected",
    "expandHeader",
  ]);

  return (
    <tr
      {...rest}
      classList={{
        [`${prefix}--parent-row`]: true,
        [`${prefix}--expandable-row`]: props.isExpanded,
        [`${prefix}--data-table--selected`]: props.isSelected,
        [props.class!]: !!props.class,
      }}
      data-parent-row
    >
      <TableCell
        class={`${prefix}--table-expand`}
        data-previous-value={previousValue()}
        headers={props.expandHeader}
      >
        <button
          type="button"
          class={`${prefix}--table-expand__button`}
          onClick={props.onExpand}
          title={props.expandIconDescription}
          aria-label={props.ariaLabel}
        >
          <ChevronRight16
            class={`${prefix}--table-expand__svg`}
            aria-label={props.expandIconDescription}
          />
        </button>
      </TableCell>
      {props.children}
    </tr>
  );
};
