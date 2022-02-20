import type { JSX, Component } from "solid-js";

export const TableActionList: Component<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "classList">
> = (props) => {
  return (
    <div
      class={`${prefix}--action-list`}
      classList={{ [props.class!]: !!props.class }}
    />
  );
};
