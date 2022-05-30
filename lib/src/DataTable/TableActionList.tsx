import type { JSX, Component } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export const TableActionList: Component<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "classList">
> = (props) => {
  const prefix = usePrefix();
  return (
    <div
      class={`${prefix}--action-list`}
      classList={{ [props.class!]: !!props.class }}
    />
  );
};
