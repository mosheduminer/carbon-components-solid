import { JSX, createSignal } from 'solid-js';
import { Checkmark16 } from '../icons/Checkmark16';
import { MenuOption } from './MenuOption';

export type MenuSelectableItemProps = {
  /**
   * Whether the option should be checked by default
   */
  initialChecked: boolean;
  /**
   * Rendered label for the MenuOptionContent
   */
  label: JSX.Element;
  /**
   * Callback function when selection the has been changed
   */
  onChange: Function;
};

export function MenuSelectableItem(props: MenuSelectableItemProps) {
  const [checked, setChecked] = createSignal(props.initialChecked);

  function handleClick() {
    setChecked(v => !v);
    props.onChange(!checked);
  }

  return (
    <MenuOption
      role="menuitemcheckbox"
      aria-checked={checked()}
      renderIcon={checked() ? Checkmark16 : undefined}
      label={props.label}
      indented
      onClick={handleClick}
    />
  );
}
