import { Component, createSignal, mergeProps, splitProps, JSX } from "solid-js";
import { settings } from 'carbon-components';
import { OverflowMenuVertical16 } from './icons/OverflowMenuVertical16';
import { uniqueId } from './internal/id';
import { Menu } from './Menu';
import keys from './internal/keyboard/keys';
import { matches as keyCodeMatches } from "./internal/keyboard/match";
import { Dynamic } from "solid-js/web";

export type OverflowMenuProps = {
  /**
   * Function called to override icon rendering.
   */
  renderIcon: Component;
  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size?: 'sm' | 'md' | 'lg';
} & JSX.HTMLAttributes<HTMLButtonElement>;

const { prefix } = settings;

const defaultSize = 'md';

export const OverflowMenu: Component<OverflowMenuProps> = (props) => {
  props = mergeProps({ renderIcon: OverflowMenuVertical16, size: defaultSize }, props);
  const [, rest] = splitProps(props, ["children", "renderIcon", "size"]);
  const id = uniqueId('overflowmenu');
  const [open, setOpen] = createSignal(false);
  const [position, setPosition] = createSignal([
    [0, 0],
    [0, 0],
  ]);
  let triggerRef!: HTMLButtonElement;

  function openMenu() {
    if (triggerRef) {
      const {
        left,
        top,
        right,
        bottom,
      } = triggerRef.getBoundingClientRect();
      setPosition([
        [left, right],
        [top, bottom],
      ]);
    }

    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function handleClick() {
    if (open()) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleMousedown(e: MouseEvent) {
    // prevent default for mousedown on trigger element to avoid
    // the "blur" event from firing on the menu as this would close
    // it and immediately re-open since "click" event is fired after
    // "blur" event.
    e.preventDefault();
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (
      open() &&
      keyCodeMatches(e, [
        keys.ArrowUp,
        keys.ArrowRight,
        keys.ArrowDown,
        keys.ArrowLeft,
      ])
    ) {
      e.preventDefault();
    }
  }

  return (
    <div class={`${prefix}--overflow-menu__container`} aria-owns={id}>
      <button
        {...rest}
        type="button"
        aria-haspopup
        aria-expanded={open()}
        classList={{
          [`${prefix}--overflow-menu`]: true,
          [`${prefix}--overflow-menu--open`]: open(),
          [`${prefix}--overflow-menu--${props.size}`]: props.size !== defaultSize,
        }}
        onClick={handleClick}
        onMouseDown={handleMousedown}
        onKeyDown={handleKeyPress}
        ref={triggerRef}>
        <Dynamic component={props.renderIcon}
          //@ts-ignore
          class={`${prefix}--overflow-menu__icon`} />
      </button>
      <Menu
        id={id}
        size={props.size}
        open={open()}
        onClose={closeMenu}
        x={position()[0]}
        y={position()[1]}>
        {props.children}
      </Menu>
    </div>
  );
}
