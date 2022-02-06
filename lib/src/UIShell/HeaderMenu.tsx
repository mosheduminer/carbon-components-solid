import {
  children,
  Component,
  createSignal,
  For,
  JSX,
  splitProps,
} from "solid-js";
import { ChevronDown16 } from "../icons/icons/ChevronDown16";
import keys from "../internal/keyboard/keys";
import { matches } from "../internal/keyboard/match";
import { usePrefix } from "../internal/usePrefix";

export type HeaderMenuProps = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  class?: string;
  ref?: (el: HTMLElement) => any;
  isCurrentPage?: boolean;
  menuLinkName: string;
  renderMenuContent?: Component;
  tabIndex?: number;
} & JSX.HTMLAttributes<HTMLLIElement>;

export const HeaderMenu: Component<HeaderMenuProps> = (props) => {
  let subMenus!: HTMLUListElement;
  let menuButtonRef!: HTMLElement;
  const prefix = usePrefix();
  const items: HTMLElement[] = [];
  const [state, setState] = createSignal<{
    expanded: boolean;
    selectedIndex: number | null;
  }>({
    expanded: false,
    selectedIndex: null,
  });
  let rest: JSX.HTMLAttributes<HTMLLIElement>;
  [props, rest] = splitProps(props, [
    "aria-label",
    "aria-labelledby",
    "children",
    "class",
    "menuLinkName",
    "ref",
    "renderMenuContent",
    "tabIndex",
  ]);

  /**
   * We capture the `ref` for each child inside of `this.items` to properly
   * manage focus. In addition to this focus management, all items receive a
   * `tabIndex: -1` so the user won't hit a large number of items in their tab
   * sequence when they might not want to go through all the items.
   */
  const renderMenuItem = (
    renderItem: (arg1: (arg2: HTMLElement) => any) => HTMLElement,
    index: number
  ) => {
    return renderItem(handleItemRef(index));
  };

  /**
   * Toggle the expanded state of the menu on click.
   */
  const handleOnClick = (e: MouseEvent) => {
    const subMenusNode = subMenus;
    if (!subMenusNode || !subMenusNode.contains(e.target as HTMLElement)) {
      e.preventDefault();
    }

    setState((state) => ({
      ...state,
      expanded: !state.expanded,
    }));
  };

  /**
   * Keyboard event handler for the entire menu.
   */
  const handleOnKeyDown = (event: KeyboardEvent) => {
    // Handle enter or space key for toggling the expanded state of the menu.
    if (matches(event, [keys.Enter, keys.Space])) {
      event.stopPropagation();
      event.preventDefault();

      setState((state) => ({
        ...state,
        expanded: !state.expanded,
      }));

      return;
    }
  };

  const handleOnBlur = (event: FocusEvent) => {
    // Rough guess for a blur event that is triggered outside of our menu or
    // menubar context
    const itemTriggeredBlur = items.find(
      (element) => element === event.relatedTarget
    );
    if (
      event.relatedTarget &&
      (((event.relatedTarget as HTMLElement).getAttribute("href") &&
        (event.relatedTarget as HTMLElement).getAttribute("href") !== "#") ||
        itemTriggeredBlur)
    ) {
      return;
    }

    setState((state) => ({
      expanded: false,
      selectedIndex: null,
    }));
  };

  /**
   * ref handler for our menu button. If we are supplied a `focusRef` prop, we also
   * forward along the node.
   *
   * This is useful when this component is a child in a
   * menu or menubar as it will allow the parent to explicitly focus the menu
   * button node when that child should receive focus.
   */
  const handleMenuButtonRef = (node: HTMLElement) => {
    if (props.ref) {
      props.ref(node);
    }
    menuButtonRef = node;
  };

  /**
   * Handles individual menuitem refs. We assign them to a class instance
   * property so that we can properly manage focus of our children.
   */
  const handleItemRef = (index: number) => (node: HTMLElement) => {
    items[index] = node;
  };

  const handleMenuClose = (event: KeyboardEvent) => {
    // Handle ESC keydown for closing the expanded menu.
    if (matches(event, [keys.Escape]) && state().expanded) {
      event.stopPropagation();
      event.preventDefault();

      setState(() => ({
        expanded: false,
        selectedIndex: null,
      }));

      // Return focus to menu button when the user hits ESC.
      menuButtonRef.focus();
      return;
    }
  };

  const childs = children(() => props.children);

  // Notes on eslint comments and based on the examples in:
  // https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#
  // - The focus is handled by the <a> menuitem, onMouseOver is for mouse
  // users
  // - aria-haspopup can definitely have the value "menu"
  // - aria-expanded is on their example node with role="menuitem"
  // - href can be set to javascript:void(0), ideally this will be a button
  return (
    <li // eslint-disable-line jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
      {...rest}
      class={`${prefix}--header__submenu`}
      classList={{
        [props.class!]: !!props.class,
        [`${prefix}--header__submenu--current`]: props.isCurrentPage,
      }}
      onKeyDown={handleMenuClose}
      onClick={handleOnClick}
      onBlur={handleOnBlur}
    >
      <a // eslint-disable-line jsx-a11y/role-supports-aria-props,jsx-a11y/anchor-is-valid
        aria-haspopup="menu" // eslint-disable-line jsx-a11y/aria-proptypes
        aria-expanded={state().expanded}
        class={`${prefix}--header__menu-item ${prefix}--header__menu-title`}
        href="#"
        onKeyDown={handleOnKeyDown}
        ref={handleMenuButtonRef}
        tabIndex={0}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
      >
        {props.menuLinkName}
        {props.renderMenuContent ? (
          <props.renderMenuContent />
        ) : (
          <ChevronDown16 class={`${prefix}--header__menu-arrow`} />
        )}
      </a>
      <ul
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        ref={subMenus}
        class={`${prefix}--header__menu`}
      >
        <For
          each={
            childs() as unknown as ((
              arg1: (arg2: HTMLElement) => any
            ) => HTMLElement)[]
          }
        >
          {(func, index) => renderMenuItem(func, index())}
        </For>
      </ul>
    </li>
  );
};
