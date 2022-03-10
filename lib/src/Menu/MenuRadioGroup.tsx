import { mergeProps } from "solid-js";
import { MenuGroup } from "./MenuGroup";
import { MenuRadioGroupOptions } from "./MenuRadioGroupOptions";

export type MenuRadioGroupProps = {
  /**
   * Whether the option should be checked by default
   */
  initialSelectedItem?: string;
  /**
   * Array of the radio options
   */
  items: string[];
  /**
   * The radio group label
   */
  label: string;
  /**
   * Callback function when selection the has been changed
   */
  onChange?: Function;
};

export function MenuRadioGroup(props: MenuRadioGroupProps) {
  props = mergeProps({ onChange: () => {} }, props);
  return (
    <MenuGroup label={props.label}>
      <MenuRadioGroupOptions
        items={props.items}
        initialSelectedItem={props.initialSelectedItem}
        onChange={props.onChange}
      />
    </MenuGroup>
  );
}
