import {
  Component,
  splitProps,
  JSX,
  mergeProps,
} from "solid-js";
import { settings } from "carbon-components";
 
const { prefix } = settings;

export type SelectItemProps = {
  class?: string;
  disabled?: boolean;
  hidden? : boolean;
  text?: string;
  value?: any;
} & JSX.HTMLAttributes<HTMLOptionElement>;

export const SelectItem: Component<SelectItemProps> = (props) => {
  let other: JSX.HTMLAttributes<HTMLOptionElement>;
  [props, other] = splitProps(props, [
    "class",
    "children",
    "disabled",
    "hidden",
    "text",
    "value"
  ]);
  props = mergeProps({
    disabled: false,
    hidden: false,
    value: '',
    text: '',
  }, props);

  return (
    <option
      {...other}
      class={`${prefix}--select-option`}
      classList={{[props.class!]: !!props.class}}
      value={props.value}
      disabled={props.disabled}
      hidden={props.hidden}>
      {props.text}
    </option>
  );
};

export default SelectItem;
 