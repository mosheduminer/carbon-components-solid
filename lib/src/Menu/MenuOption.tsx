import { CaretRight16 } from "../icons/CaretRight16";
import keys from "../internal/keyboard/keys";
import { match } from "../internal/keyboard/match";

import {
  getFirstSubNode,
  focusNode,
  getParentMenu,
  clickedElementHasSubnodes,
} from "./_utils";

import { Menu } from "./Menu";
import {
  Component,
  createEffect,
  createSignal,
  JSX,
  children,
  splitProps,
  mergeProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { callEventHandlerUnion } from "../internal/callEventHandlerUnion";
import { usePrefix } from "../internal/usePrefix";

const hoverIntentDelay = 150; // in ms

export type MenuOptionContentProps = {
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
  /**
   * Icon that is displayed in front of the option
   */
  icon?: Component;
  /**
   * Whether the content should be indented
   */
  indented?: boolean;
  /**
   * Additional information such as shortcut or caret
   */
  info?: JSX.Element;
  /**
   * Rendered label for the MenuOptionContent
   */
  label: JSX.Element;
};

function MenuOptionContent(props: MenuOptionContentProps) {
  const prefix = usePrefix()
  return (
    <div
      classList={{
        [`${prefix}--menu-option__content--disabled`]: props.disabled,
        [`${prefix}--menu-option__content`]: true,
      }}
    >
      {props.indented && (
        <div class={`${prefix}--menu-option__icon`}>
          <Dynamic component={props.icon} />
        </div>
      )}
      <span
        class={`${prefix}--menu-option__label`}
        //@ts-ignore
        title={props.label}
      >
        {props.label}
      </span>
      <div class={`${prefix}--menu-option__info`}>{props.info}</div>
    </div>
  );
}

export type MenuOptionProps = {
  /**
   * Specify whether this MenuOption is disabled
   */
  disabled?: boolean;
  /**
   * Whether the content should be indented (for example because it's in a group with options that have icons).
   * Is automatically set by Menu
   */
  indented?: boolean;
  /**
   * Optional prop to specify the kind of the MenuOption
   */
  kind?: "default" | "danger";
  /**
   * Rendered label for the MenuOption
   */
  label?: JSX.Element;
  /**
   * Which nested level this option is located in.
   * Is automatically set by Menu
   */
  level?: number;
  /**
   * The onClick handler
   */
  onClick?: JSX.EventHandlerUnion<HTMLElement, Event>;
  /**
   * Rendered icon for the MenuOption.
   */
  renderIcon?: Component;
  /**
   * Rendered shortcut for the MenuOption
   */
  shortcut?: JSX.Element;
} & JSX.HTMLAttributes<HTMLLIElement>;

export const MenuOption: Component<MenuOptionProps> = (props) => {
  const prefix = usePrefix();
  const [, rest] = splitProps(props, [
    "children",
    "disabled",
    "indented",
    "kind",
    "label",
    "level",
    "onClick",
    "renderIcon",
    "shortcut",
  ]);
  props = mergeProps({ kind: "default", onClick: () => {} }, props);
  const [submenuOpen, setSubmenuOpen] = createSignal(false);
  const [submenuOpenedByKeyboard, setSubmenuOpenedByKeyboard] =
    createSignal(false);
  let rootRef!: HTMLLIElement;
  let hoverIntentTimeout: number;

  const childs = children(() => props.children);

  function openSubmenu(openedByKeyboard = false) {
    setSubmenuOpenedByKeyboard(openedByKeyboard);
    setSubmenuOpen(true);
  }

  const handleKeyDown: JSX.EventHandler<HTMLElement, KeyboardEvent> = (
    event
  ) => {
    if (
      clickedElementHasSubnodes(event) &&
      (match(event, keys.ArrowRight) ||
        match(event, keys.Enter) ||
        match(event, keys.Space))
    ) {
      openSubmenu(true);
    } else if (match(event, keys.Enter) || match(event, keys.Space)) {
      callEventHandlerUnion(props.onClick, event);
    }
  };

  function handleMouseEnter() {
    if (childs())
      hoverIntentTimeout = setTimeout(openSubmenu, hoverIntentDelay) as unknown as number;
  }

  function handleMouseLeave() {
    if (childs()) {
      clearTimeout(hoverIntentTimeout);

      setSubmenuOpen(false);
    }
  }

  function getSubmenuPosition() {
    const pos = [0, 0];

    if (childs()) {
      const parentMenu = getParentMenu(rootRef);

      if (parentMenu) {
        const { x, width } = parentMenu.getBoundingClientRect();
        const { y } = rootRef.getBoundingClientRect();

        pos[0] = x + width;
        pos[1] = y;
      }
    }

    return pos;
  }

  createEffect(() => {
    if (childs() && submenuOpenedByKeyboard()) {
      const firstSubnode = getFirstSubNode(rootRef) as HTMLElement | null;
      focusNode(firstSubnode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submenuOpen]);

  const allowedRoles = ["menuitemradio", "menuitemcheckbox"];
  const role =
    rest.role && allowedRoles.includes(rest.role) ? rest.role : "menuitem";

  const submenuPosition = getSubmenuPosition();

  return (indented?: () => boolean, level?: () => number) => (
    // role is either menuitemradio, menuitemcheckbox, or menuitem which are all interactive
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      {...rest}
      ref={rootRef}
      classList={{
        [`${prefix}--menu-option`]: true,
        [`${prefix}--menu-option--disabled`]: props.disabled,
        [`${prefix}--menu-option--active`]: !!(childs() && submenuOpen()),
        [`${prefix}--menu-option--danger`]:
          !childs() && props.kind === "danger",
      }}
      role={role}
      tabIndex={-1}
      aria-disabled={!childs() && props.disabled}
      aria-haspopup={childs() ? true : undefined}
      aria-expanded={childs() ? submenuOpen() : undefined}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={props.onClick}
    >
      {childs() ? (
        <>
          <MenuOptionContent
            label={props.label}
            icon={props.renderIcon}
            info={<CaretRight16 />}
            indented={props.indented || indented?.()}
          />
          <Menu
            level={((props.level || level?.()) as number) + 1}
            open={submenuOpen()}
            onClose={() => setSubmenuOpen(false)}
            x={submenuPosition[0]}
            y={submenuPosition[1]}
          >
            {childs()}
          </Menu>
        </>
      ) : (
        <MenuOptionContent
          label={props.label}
          disabled={props.disabled}
          icon={props.renderIcon}
          info={props.shortcut}
          indented={props.indented}
        />
      )}
    </li>
  );
};
