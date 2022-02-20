import { Component, splitProps } from "solid-js";
import { OverflowMenuItem } from "../OverflowMenuItem";

export type TableToolbarActionProps = {
  class?: string;
  onClick: Function;
  ref?: HTMLElement;
};

export const TableToolbarAction: Component<TableToolbarActionProps> = (
  props
) => {
  const [, rest] = splitProps(props, ["children", "ref"]);
  return (
    //@ts-ignore ignoring index prop
    <OverflowMenuItem ref={props.ref} itemText={props.children} {...rest} />
  );
};
