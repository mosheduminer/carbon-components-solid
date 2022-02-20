import { Component, JSX, mergeProps, splitProps, DEV } from "solid-js";
import keys from "./internal/keyboard/keys";
import { callEventHandlerUnion } from "./internal/callEventHandlerUnion";
import { match } from "./internal/keyboard/match";
import { warning } from "./internal/warning";
import { usePrefix } from "./internal/usePrefix";
import { Dynamic } from "solid-js/web";

export type OverflowMenuItemProps = {
  /**
   * The CSS class name to be placed on the button element
   */
  class?: string;
  /**
   * A callback to tell the parent menu component that the menu should be closed.
   */
  closeMenu?: Function;
  /**
   * `true` to make this menu item disabled.
   */
  disabled?: boolean;
  handleOverflowMenuItemFocus?: (state: {
    currentIndex: number;
    direction: 1 | -1;
  }) => any;
  /**
   * `true` to make this menu item a divider.
   */
  hasDivider?: boolean;
  /**
   * If given, overflow item will render as a link with the given href
   */
  href?: string;

  index: number;
  /**
   * `true` to make this menu item a "danger button".
   */
  isDelete?: boolean;
  /**
   * The text in the menu item.
   */
  itemText: JSX.Element;
  /**
   * event handlers
   */
  onBlur?: Function;
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  onFocus?: Function;
  onKeyDown?: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent>;
  onKeyUp?: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent>;
  onMouseDown?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  onMouseEnter?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  onMouseLeave?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  onMouseUp?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  ref?: HTMLElement | ((el: HTMLElement) => any);
  /**
   * `true` if this menu item has long text and requires a browser tooltip
   */
  requireTitle?: boolean;
  /**
   * Specify a title for the OverflowMenuItem
   */
  title?: string;
  /**
   * The CSS class name to be placed on the wrapper list item element
   */
  wrapperClassName?: string;
};

const noop = () => {};

export const OverflowMenuItem: Component<OverflowMenuItemProps> = (props) => {
  const [, rest] = splitProps(props, [
    "class",
    "closeMenu",
    "disabled",
    "handleOverflowMenuItemFocus",
    "hasDivider",
    "href",
    "isDelete",
    "index",
    "itemText",
    "onClick",
    "onKeyDown",
    "ref",
    "requireTitle",
    "title",
    "wrapperClassName",
  ]);
  props = mergeProps(
    {
      disabled: false,
      hasDivider: false,
      isDelete: false,
      itemText: "Provide itemText",
      onClick: noop,
      onKeyDown: noop,
    },
    props
  );
  const prefix = usePrefix();

  function setTabFocus(evt: KeyboardEvent) {
    if (match(evt, keys.ArrowDown)) {
      props.handleOverflowMenuItemFocus?.({
        currentIndex: props.index,
        direction: 1,
      });
    }
    if (match(evt, keys.ArrowUp)) {
      props.handleOverflowMenuItemFocus?.({
        currentIndex: props.index,
        direction: -1,
      });
    }
  }

  function handleClick(
    evt: MouseEvent & { currentTarget: HTMLElement; target: Element }
  ) {
    callEventHandlerUnion(props.onClick, evt);
    props.closeMenu?.();
  }

  if (DEV) {
    warning(
      !!props.closeMenu,
      "`<OverflowMenuItem>` detected missing `closeMenu` prop. " +
        "`closeMenu` is required to let `<OverflowMenu>` close the menu upon actions on `<OverflowMenuItem>`. " +
        "Please make sure `<OverflowMenuItem>` is a direct child of `<OverflowMenu>."
    );
  }

  const OverflowMenuItemContent = () => {
    if (typeof props.itemText !== "string") {
      return props.itemText;
    }
    return (
      <div className={`${prefix}--overflow-menu-options__option-content`}>
        {props.itemText}
      </div>
    );
  };

  return (
    <li
      classList={{
        [`${prefix}--overflow-menu--divider`]: props.hasDivider,
        [`${prefix}--overflow-menu-options__option--danger`]: props.isDelete,
        [`${prefix}--overflow-menu-options__option--disabled`]: props.disabled,
        [props.wrapperClassName!]: !!props.wrapperClassName,
        [`${prefix}--overflow-menu-options__option`]: true,
      }}
      role="none"
    >
      <Dynamic
        component={props.href ? "a" : "button"}
        class={`${prefix}--overflow-menu-options__btn`}
        classList={{
          [props.class!]: !!props.class,
        }}
        disabled={props.disabled}
        href={props.href}
        index={props.index}
        onClick={handleClick}
        onKeyDown={(
          evt: KeyboardEvent & { currentTarget: HTMLElement; target: Element }
        ) => {
          setTabFocus(evt);
          callEventHandlerUnion(props.onKeyDown, evt);
        }}
        role="menuitem"
        ref={props.ref}
        tabIndex="-1"
        title={props.requireTitle ? props.title || props.itemText : undefined}
        {...rest}
      >
        {OverflowMenuItemContent()}
      </Dynamic>
    </li>
  );
};
