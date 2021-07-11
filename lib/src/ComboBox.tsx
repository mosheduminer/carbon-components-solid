//@ts-nocheck
import { Component } from "solid-js";

export type ComboBoxProps = {
  ariaLabel?: string;
  direction: "top" | "bottom";
  disabled?: boolean;
  downshiftProps;
  helperText;
  id;
  initialSelectedItem;
  invalid;
  invalidText;
  items;
  itemToElement;
  itemToString;
  light;
  onChange;
  onInputChange;
  onToggleClick; // eslint-disable-line no-unused-vars
  placeholder;
  selectedItem;
  shouldFilterItem;
  size;
  titleText;
  translateWithId;
  type; // eslint-disable-line no-unused-vars
  warn;
  warnText;
};

export const ComboBox: Component<ComboBoxProps> = (props) => {
  return <></>
}