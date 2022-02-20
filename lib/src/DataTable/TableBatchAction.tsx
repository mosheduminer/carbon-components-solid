import { AddFilled16 as iconAddSolid } from "../icons/AddFilled16";
import { Button } from "../Button";
import { Component, mergeProps } from "solid-js";

export type TableBatchActionProps = {
  hasIconOnly?: boolean;
  iconDescription?: string;
  renderIcon?: Component;
};

export const TableBatchAction: Component<TableBatchActionProps> = (props) => {
  props = mergeProps({ renderIcon: iconAddSolid }, props);
  if (props.renderIcon && !props.children && !props.iconDescription) {
    throw new Error(
      "renderIcon property specified without also providing an iconDescription property."
    );
  }
  return <Button {...props} />;
};
