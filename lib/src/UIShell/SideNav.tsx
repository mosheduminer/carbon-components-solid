import { usePrefix } from "../internal/usePrefix";
import {
  Accessor,
  children,
  Component,
  createSignal,
  For,
  JSX,
  mergeProps,
  splitProps,
} from "solid-js";
// TO-DO: comment back in when footer is added for rails
// import SideNavFooter from './SideNavFooter';

export type SideNavProps = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  addFocusListeners?: boolean;
  addMouseListeners?: boolean;
  class?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  isChildOfHeader?: boolean;
  isFixedNav?: boolean;
  isPersistent?: boolean;
  isRail?: boolean;
  onOverlayClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>;
  onToggle?: (e: Event, value: boolean) => any;
  translateById?: Function;
  ref?: HTMLElement | ((el: HTMLElement) => any);
};

export const SideNav: Component<SideNavProps> = (props) => {
  props = mergeProps(
    {
      defaultExpanded: false,
      isChildOfHeader: true,
      isFixedNav: false,
      isPersistent: true,
      addFocusListeners: true,
      addMouseListeners: true,
    },
    props
  );
  const [, rest] = splitProps(props, [
    "expanded",
    "defaultExpanded",
    "isChildOfHeader",
    "aria-label",
    "aria-labelledby",
    "children",
    "onToggle",
    "class",
    "translateById",
    "isFixedNav",
    "isRail",
    "isPersistent",
    "addFocusListeners",
    "addMouseListeners",
    "onOverlayClick",
    "ref",
  ]);

  const prefix = usePrefix();
  const controlled = () => props.expanded !== undefined;
  const [expandedState, setExpandedState] = createSignal(props.defaultExpanded);
  const [expandedViaHoverState, setExpandedViaHoverState] = createSignal(
    props.defaultExpanded
  );
  const expanded = () => (controlled() ? props.expanded : expandedState());
  const handleToggle = (
    event: Event & {
      currentTarget: HTMLElement;
      target: Element;
    },
    value = !expanded()
  ) => {
    if (!controlled) {
      setExpandedState(value);
    }
    if (props.onToggle) {
      props.onToggle(event, value);
    }
    if (controlled() || props.isRail) {
      setExpandedViaHoverState(value);
    }
  };

  // TO-DO: comment back in when footer is added for rails
  // const assistiveText = expanded
  //   ? t('carbon.sidenav.state.open')
  //   : t('carbon.sidenav.state.closed');

  let childrenToRender = children(() => props.children) as unknown as () => ((
    expanded?: Accessor<boolean | undefined>
  ) => any)[];

  let eventHandlers = {};

  return (
    <>
      {props.isFixedNav ? null : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          classList={{
            [`${prefix}--side-nav__overlay`]: true,
            [`${prefix}--side-nav__overlay-active`]:
              expanded() || expandedViaHoverState(),
          }}
          onClick={props.onOverlayClick}
        />
      )}
      <nav
        onFocus={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            handleToggle(event, true);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            handleToggle(event, false);
          }
        }}
        onMouseEnter={(e) =>
          props.addMouseListeners && props.isRail && handleToggle(e, true)
        }
        onMouseLeave={(e) =>
          props.addMouseListeners && props.isRail && handleToggle(e, true)
        }
        aria-hidden={!expanded}
        ref={props.ref}
        class={`${prefix}--side-nav__navigation ${prefix}--side-nav`}
        classList={{
          [`${prefix}--side-nav--expanded`]:
            expanded() || expandedViaHoverState(),
          [`${prefix}--side-nav--collapsed`]: !expanded() && props.isFixedNav,
          [`${prefix}--side-nav--rail`]: props.isRail,
          [props.class!]: !!props.class,
          [`${prefix}--side-nav--ux`]: props.isChildOfHeader,
          [`${prefix}--side-nav--hidden`]: !props.isPersistent,
        }}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        {...eventHandlers}
        {...rest}
      >
        {props.isRail ? (
          <For each={childrenToRender()}>
            {(child) =>
              child(() =>
                controlled()
                  ? expandedViaHoverState() || expanded()
                  : expanded()
              )
            }
          </For>
        ) : (
          childrenToRender()
        )}
      </nav>
    </>
  );
};
