import { settings } from "carbon-components";
import { Component, mergeProps, Show, splitProps } from "solid-js";

const { prefix } = settings;

export type TableProps = {
  class?: string;
  /**
   * `false` If true, will apply sorting styles
   */
  isSortable?: boolean;

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  overflowMenuOnHover?: boolean;
  /**
   *  Change the row height of table. Currently supports `xs`, `sm`, `md`, `lg`, and `xl`.
   *  The previous terms (`compact`, `short`, `normal`, and `tall`) will be removed in the next major release.
   */
  size?:
    | "compact"
    | "short"
    | "normal"
    | "tall"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl";
  /**
   * `false` If true, will keep the header sticky (only data rows will scroll)
   */
  stickyHeader?: boolean;
  /**
   * `false` If true, will use a width of 'auto' instead of 100%
   */
  useStaticWidth?: boolean;
  /**
   * `true` to add useZebraStyles striping.
   */
  useZebraStyles?: boolean;
};

export const Table: Component<TableProps> = (props) => {
  props = mergeProps(
    {
      isSortable: false,
      overflowMenuOnHover: true,
    },
    props
  );
  const [, rest] = splitProps(props, [
    "class",
    "children",
    "useZebraStyles",
    "size",
    "isSortable",
    "useStaticWidth",
    "stickyHeader",
    "overflowMenuOnHover",
  ]);
  const InnerTable = () => (
    <div class={`${prefix}--data-table-content`}>
      <table
        {...rest}
        classList={{
          [`${prefix}--data-table--${props.size}`]: !!props.size,
          [`${prefix}--data-table--sort`]: props.isSortable,
          [`${prefix}--data-table--zebra`]: props.useZebraStyles,
          [`${prefix}--data-table--static`]: props.useStaticWidth,
          [`${prefix}--data-table--sticky-header`]: props.stickyHeader,
          [`${prefix}--data-table--visible-overflow-menu`]:
            !props.overflowMenuOnHover,
          [props.class!]: !!props.class,
        }}
        class={`${prefix}--data-table`}
      >
        {props.children}
      </table>
    </div>
  );
  return (
    <Show when={props.stickyHeader} fallback={<InnerTable />}>
      <section class={`${prefix}--data-table_inner-container`}>
        <InnerTable />
      </section>
    </Show>
  );
};
