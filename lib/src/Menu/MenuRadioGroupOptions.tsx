import { createSignal, For, mergeProps } from "solid-js";
import { Checkmark16 } from "../icons/Checkmark16";
import { MenuOption } from "./MenuOption";

export type MenuRadioGroupOptionsProps = {
  /**
   * Whether the option should be checked by default
   */
  initialSelectedItem?: string;
  /**
   * Array of the radio options
   */
  items: string[];
  /**
   * Callback function when selection the has been changed
   */
  onChange?: Function;
};

export function MenuRadioGroupOptions(props: MenuRadioGroupOptionsProps) {
  props = mergeProps({ onChange: () => {} }, props);
  const [selected, setSelected] = createSignal(props.initialSelectedItem);

  function handleClick(option: string) {
    setSelected(option);
    props.onChange!(option);
  }

  return (
    <For each={props.items}>
      {(option) => {
        return (
          <MenuOption
            role="menuitemradio"
            aria-checked={selected() === option}
            renderIcon={selected() === option ? Checkmark16 : undefined}
            label={option}
            indented
            onClick={[handleClick, option]}
          />
        );
      }}
    </For>
  );
}
