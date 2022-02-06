import { ChevronDown20 } from "../icons/ChevronDown20";
import { SideNavIcon } from "./SideNavIcon";
import keys from "../internal/keyboard/keys";
import { match } from "../internal/keyboard/match";
import { usePrefix } from "../internal/usePrefix";
import { Component, createSignal, mergeProps, createContext, Accessor } from "solid-js";
import { Dynamic } from "solid-js/web";

export type SideNavMenuProps = {
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => any);
  class?: string;
  defaultExpanded?: boolean;
  isActive?: boolean;
  isSideNavExpanded?: boolean;
  large?: boolean;
  renderIcon?: Component;
  title: string;
};

export const ActiveChildContext = createContext<[Accessor<number>, (cb: (arg: number) => number) => any]>();

export const SideNavMenu: Component<SideNavMenuProps> = (props) => {
  const prefix = usePrefix();
  props = mergeProps(
    {
      defaultExpanded: false,
      isActive: false,
      large: false,
    },
    props
  );
  const [state, setState] = createSignal({
    isExpanded: props.defaultExpanded || false,
    wasPreviouslyExpanded: props.defaultExpanded || false,
  });
  const [activeChildrenCount, setActiveChildrenCount] = createSignal(0);
  const derived = () => getDerivedStateFromProps(props, state());
  const handleToggleExpand = () => {
    setState((state) => ({ ...state, isExpanded: !state.isExpanded }));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (match(event, keys.Escape)) {
      setState((state) => ({ ...state, isExpanded: false }));
    }
  };

  const hasActiveChildren = () => activeChildrenCount() === 0;

  return (
    <ActiveChildContext.Provider value={[activeChildrenCount, setActiveChildrenCount]}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions*/}
      <li classList={{
        [`${prefix}--side-nav__item`]: true,
        [`${prefix}--side-nav__item--active`]:
          !!props.isActive || (hasActiveChildren() && !derived().isExpanded),
        [`${prefix}--side-nav__item--icon`]: !!props.renderIcon,
        [`${prefix}--side-nav__item--large`]: !!props.large,
        [props.class!]: !!props.class,
      }} onKeyDown={handleKeyDown}>
        <button
          aria-expanded={derived().isExpanded}
          className={`${prefix}--side-nav__submenu`}
          onClick={handleToggleExpand}
          ref={props.ref}
          type="button"
        >
          {props.renderIcon && (
            <SideNavIcon>
              <Dynamic component={props.renderIcon} />
            </SideNavIcon>
          )}
          <span class={`${prefix}--side-nav__submenu-title`}>{props.title}</span>
          <SideNavIcon class={`${prefix}--side-nav__submenu-chevron`} small>
            <ChevronDown20 />
          </SideNavIcon>
        </button>
        <ul class={`${prefix}--side-nav__menu`}>{props.children}</ul>
      </li>
    </ActiveChildContext.Provider>
  );
};

type State = { isExpanded?: boolean; wasPreviouslyExpanded?: boolean };
const getDerivedStateFromProps = (
  props: SideNavMenuProps,
  state: State
): State => {
  let derivedState = {};

  if (props.isSideNavExpanded === false && state.isExpanded === true) {
    derivedState = {
      isExpanded: props.isSideNavExpanded,
      wasPreviouslyExpanded: true,
    };
  } else if (
    props.isSideNavExpanded === true &&
    state.wasPreviouslyExpanded === true
  ) {
    derivedState = {
      isExpanded: props.isSideNavExpanded,
      wasPreviouslyExpanded: false,
    };
  }

  return derivedState;
};
