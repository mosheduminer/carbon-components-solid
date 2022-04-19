import { Component, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type TableContainerProps = {
  class?: string;
  /**
   * Optional description text for the Table
   */
  description?: JSX.Element;
  /**
   * Specify whether the table should have a sticky header
   */
  stickyHeader?: boolean;
  /**
   * Provide a title for the Table
   */
  title?: JSX.Element;
  /**
   * If true, will use a width of 'fit-content' to match the inner table width
   */
  useStaticWidth?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const TableContainer: Component<TableContainerProps> = (props) => {
  const prefix = usePrefix();
  const [, rest] = splitProps(props, [
    "class",
    "children",
    "title",
    "description",
    "stickyHeader",
    "useStaticWidth",
  ]);
  return (
    <div
      {...rest}
      class={`${prefix}--data-table-container`}
      classList={{
        [`${prefix}--data-table--max-width`]: props.stickyHeader,
        [`${prefix}--data-table-container--static`]: props.useStaticWidth,
        [props.class!]: !!props.class,
      }}
    >
      {props.title && (
        <div class={`${prefix}--data-table-header`}>
          <h4 class={`${prefix}--data-table-header__title`}>{props.title}</h4>
          <p class={`${prefix}--data-table-header__description`}>
            {props.description}
          </p>
        </div>
      )}
      {props.children}
    </div>
  );
};
