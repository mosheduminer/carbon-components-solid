import { ChevronRight16 } from "../icons/ChevronRight16";
import { settings } from "carbon-components";
import { splitProps, Component, JSX } from "solid-js";

const { prefix } = settings;

export type TableExpandHeaderProps = {
  /**
   * Specify the string read by a voice reader when the expand trigger is
   * focused
   */
  ariaLabel: string;
  class?: string;
  /**
   * Specify whether an expand all button should be displayed
   */
  enableToggle?: boolean;
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
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
};

export const TableExpandHeader: Component<TableExpandHeaderProps> = (props) => {
  const [, rest] = splitProps(props, [
    "ariaLabel",
    "class",
    "enableToggle",
    "isExpanded",
    "onExpand",
    "expandIconDescription",
    "children",
  ]);
  const previousValue = () => props.isExpanded ? "collapsed" : undefined;

  return (
    <th
      scope="col"
      class={`${prefix}--table-expand`}
      classList={{[props.class!]: !!props.class}}
      data-previous-value={previousValue()}
      {...rest}
    >
      {props.enableToggle ? (
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
      ) : null}
      {props.children}
    </th>
  );
};
