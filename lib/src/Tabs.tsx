///TODO
/// I added some hacks to this file so it should work.
/// Those should be removed after the next release of carbon (stylesheets).

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  children as childrenHelper,
  createSignal,
  createEffect,
  useContext,
  createContext,
  Component,
  untrack,
  For,
  JSX,
  onMount,
  mergeProps,
  splitProps,
  onCleanup,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Accessor, Setter } from "solid-js";
import keys from "./internal/keyboard/keys";
import { match, matches } from "./internal/keyboard/match";
import { usePrefix } from "./internal/usePrefix";
import { createFallbackId } from "./internal/id";
import { getInteractiveContent } from "./internal/useNoInteractiveChildren";
import { useControllableState } from "./internal/useControllableState";
import { callEventHandlerUnion } from "./internal/callEventHandlerUnion";
import { debounce } from "lodash-es";
import { ChevronLeft16 } from "./icons/ChevronLeft16";
import { ChevronRight16 } from "./icons/ChevronRight16";

// Used to manage the overall state of the Tabs
const TabsContext = createContext<{
  baseId?: string;
  defaultSelectedIndex: number;
  activeIndex: Accessor<number>;
  selectedIndex: Accessor<number>;
  setSelectedIndex: Setter<number>;
  setActiveIndex: Setter<number>;
}>();

export type TabsProps = {
  onChange?: Function;
  selectedIndex?: number;
  defaultSelectedIndex?: number;
};

const Tabs: Component<TabsProps> = function (props) {
  props = mergeProps(
    {
      defaultSelectedIndex: 0,
    },
    props
  );
  const baseId = createFallbackId("ccs");
  // The active index is used to track the element which has focus in our tablist
  const [activeIndex, setActiveIndex] = createSignal(
    props.defaultSelectedIndex!
  );
  // The selected index is used for the tab/panel pairing which is "visible"
  const [selectedIndex, setSelectedIndex] = useControllableState({
    value: () => props.selectedIndex,
    defaultValue: props.defaultSelectedIndex!,
    onChange: (value) => {
      if (props.onChange) {
        props.onChange({ selectedIndex: value });
      }
    },
  });

  const value = {
    baseId,
    activeIndex,
    defaultSelectedIndex: props.defaultSelectedIndex!,
    setActiveIndex,
    selectedIndex,
    setSelectedIndex,
  };

  return (
    <TabsContext.Provider value={value}>{props.children}</TabsContext.Provider>
  );
};

function useEffectOnce(callback: Function) {
  let savedCallback = callback;
  let effectGuard = false;

  createEffect(() => {
    savedCallback = callback;
  });

  createEffect(() =>
    untrack(() => {
      if (effectGuard !== true) {
        effectGuard = true;
        savedCallback();
      }
    })
  );
}

/**
 * Get the next index for a given keyboard event given a count of the total
 * items and the current index
 * @param {Event} event
 * @param {number} total
 * @param {number} index
 * @returns {number}
 */
function getNextIndex(event: KeyboardEvent, total: number, index: number) {
  if (match(event, keys.ArrowRight)) {
    return (index + 1) % total;
  } else if (match(event, keys.ArrowLeft)) {
    return (total + index - 1) % total;
  } else if (match(event, keys.Home)) {
    return 0;
  } else if (match(event, keys.End)) {
    return total - 1;
  }
}

export type TabListProps = {
  activation?: "automatic" | "manual";
  "aria-label": string;
  class?: string;
  light?: boolean;
  contained?: boolean;
  iconSize?: "default" | "lg";
  scrollIntoView?: boolean;
  scrollDebounceWait?: number;
  leftOverflowButtonProps?: JSX.ButtonHTMLAttributes<HTMLButtonElement>;
  rightOverflowButtonProps?: JSX.ButtonHTMLAttributes<HTMLButtonElement>;
} & JSX.HTMLAttributes<HTMLDivElement>;

const TabList: Component<TabListProps> = (props) => {
  props = mergeProps(
    {
      activation: "automatic",
      contained: false,
      scrollDebounceWait: 200,
      iconSize: "default",
    },
    props
  );
  const [, rest] = splitProps(props, [
    "activation",
    "aria-label",
    "children",
    "class",
    "iconSize",
    "light",
    "scrollIntoView",
    "contained",
    "leftOverflowButtonProps",
    "rightOverflowButtonProps",
  ]);
  const prefix = usePrefix();

  return () => {
    let ref!: HTMLDivElement;
    let previousButton!: HTMLButtonElement;
    let nextButton!: HTMLButtonElement;
    const childs = childrenHelper(() => props.children);
    const tabs: HTMLButtonElement[] = [];
    const tabsIndexes = useContext(TabsContext)!;
    const buttonWidth = 44;
    const [isScrollable, setIsScrollable] = createSignal(false);
    const [scrollLeft, setScrollLeft] = createSignal<number | null>(null);
    const isPreviousButtonVisible = () =>
      ref ? isScrollable() && scrollLeft()! > 0 : false;
    const isNextButtonVisible = () =>
      ref
        ? scrollLeft()! + buttonWidth + ref.clientWidth < ref.scrollWidth
        : false;
    const debouncedOnScroll = debounce(
      (event: { currentTarget: EventTarget }) => {
        setScrollLeft((event.currentTarget as HTMLElement).scrollLeft);
      },
      props.scrollDebounceWait
    );
    function onKeyDown(event: KeyboardEvent) {
      if (
        matches(event, [keys.ArrowRight, keys.ArrowLeft, keys.Home, keys.End])
      ) {
        const activeTabs = tabs.filter((tab) => {
          return !tab.disabled;
        });

        const currentIndex = activeTabs.indexOf(
          tabs[
            props.activation === "automatic"
              ? tabsIndexes.selectedIndex()
              : tabsIndexes.activeIndex()
          ]
        );
        const nextIndex = tabs.indexOf(
          activeTabs[getNextIndex(event, activeTabs.length, currentIndex)!]
        );

        if (props.activation === "automatic") {
          tabsIndexes.setSelectedIndex(nextIndex);
        } else if (props.activation === "manual") {
          tabsIndexes.setActiveIndex(nextIndex);
        }

        tabs[nextIndex].focus();
      }
    }

    useEffectOnce(() => {
      const tab = tabs[tabsIndexes.selectedIndex()];
      if (props.scrollIntoView && tab) {
        tab.scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
      }
    });

    useEffectOnce(() => {
      if (tabs[tabsIndexes.selectedIndex()].disabled) {
        const activeTabs = tabs.filter((tab) => {
          return !tab.disabled;
        });

        if (activeTabs.length > 0) {
          const tab = activeTabs[0];
          tabsIndexes.setSelectedIndex(tabs.indexOf(tab));
        }
      }
    });

    createEffect(() => {
      if (ref) {
        setIsScrollable(ref.scrollWidth > ref.clientWidth);
      }

      function handler() {
        if (ref) {
          setIsScrollable(ref.scrollWidth > ref.clientWidth);
        }
      }

      const debouncedHandler = debounce(handler, 200);
      window.addEventListener("resize", debouncedHandler);
      onCleanup(() => {
        debouncedHandler.cancel();
        window.removeEventListener("resize", debouncedHandler);
      });
    });

    createEffect(() => {
      const sl = scrollLeft();
      if (sl !== null) {
        ref.scrollLeft = sl;
      }
    });

    createEffect(() => {
      if (!isScrollable()) {
        return;
      }

      const tab =
        props.activation === "manual"
          ? tabs[tabsIndexes.activeIndex()]
          : tabs[tabsIndexes.selectedIndex()];
      if (tab) {
        // The width of the "scroll buttons"

        // The start and end position of the selected tab
        const { width: tabWidth } = tab.getBoundingClientRect();
        const start = tab.offsetLeft;
        const end = tab.offsetLeft + tabWidth;

        // The start and end of the visible area for the tabs
        const visibleStart = ref.scrollLeft + buttonWidth;
        const visibleEnd = ref.scrollLeft + ref.clientWidth - buttonWidth;

        // The beginning of the tab is clipped and not visible
        if (start < visibleStart) {
          setScrollLeft(start - buttonWidth);
        }

        // The end of teh tab is clipped and not visible
        if (end > visibleEnd) {
          setScrollLeft(end + buttonWidth - ref.clientWidth);
        }
      }
    });

    usePressable(() => previousButton, {
      onPress:
        () =>
        ({ longPress }) => {
          if (!longPress) {
            setScrollLeft(
              Math.max(scrollLeft()! - (ref.scrollWidth / tabs.length) * 1.5, 0)
            );
          }
        },
      onLongPress: () => () => {
        return createLongPressBehavior(() => ref, "backward", setScrollLeft);
      },
    });

    usePressable(() => nextButton, {
      onPress:
        () =>
        ({ longPress }) => {
          if (!longPress) {
            setScrollLeft(
              Math.min(
                scrollLeft()! + (ref.scrollWidth / tabs.length) * 1.5,
                ref.scrollWidth - ref.clientWidth
              )
            );
          }
        },
      onLongPress: () => () => {
        return createLongPressBehavior(() => ref, "forward", setScrollLeft);
      },
    });

    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    return (
      <div
        class={`${prefix}--tabs`}
        classList={{
          [`${prefix}--tabs--contained`]: props.contained,
          [`${prefix}--tabs--light`]: props.light,
          [`${prefix}--tabs__icon--default`]: props.iconSize === "default",
          [`${prefix}--tabs__icon--lg`]: props.iconSize === "lg",
        }}
      >
        <button
          aria-hidden="true"
          aria-label="Scroll left"
          ref={previousButton}
          classList={{
            [`${prefix}--tab--overflow-nav-button`]: true,
            [`${prefix}--tab--overflow-nav-button--previous`]: true,
            [`${prefix}--tab--overflow-nav-button--hidden`]:
              !isPreviousButtonVisible(),
          }}
          type="button"
          {...(props.leftOverflowButtonProps || {})}
        >
          <ChevronLeft16 />
        </button>
        <div
          {...rest}
          aria-label={props["aria-label"]}
          ref={ref}
          role="tablist"
          class={`${prefix}--tab--list`}
          onKeyDown={onKeyDown}
        >
          <For
            each={
              Array.isArray(childs())
                ? (childs() as unknown as Function[])
                : [childs() as unknown as Function]
            }
          >
            {(child, index) => {
              return child(index, (el: HTMLButtonElement) => tabs.push(el));
            }}
          </For>
        </div>
        <button
          aria-hidden="true"
          aria-label="Scroll right"
          ref={nextButton}
          classList={{
            [`${prefix}--tab--overflow-nav-button`]: true,
            [`${prefix}--tab--overflow-nav-button--next`]: true,
            [`${prefix}--tab--overflow-nav-button--hidden`]:
              !isNextButtonVisible(),
          }}
          type="button"
          {...(props.rightOverflowButtonProps || {})}
        >
          <ChevronRight16 />
        </button>
      </div>
    );
  };
};

export type TabProps = {
  as?: string | Component;
  class?: string;
  disabled?: boolean;
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  onKeyDown?: JSX.EventHandlerUnion<HTMLElement, KeyboardEvent>;
  ref?: HTMLElement | ((arg: HTMLElement) => any);
} & JSX.HTMLAttributes<HTMLButtonElement>;

//@ts-ignore
const Tab: Component<TabProps> = (props) => {
  props = mergeProps({ as: "button" }, props);
  const [, rest] = splitProps(props, [
    "as",
    "children",
    "class",
    "disabled",
    "onClick",
    "onKeyDown",
    "ref",
  ]);
  return (index: Accessor<number>, ref: (arg: HTMLElement) => any) => {
    const prefix = usePrefix();
    const { selectedIndex, setSelectedIndex, baseId } =
      useContext(TabsContext)!;
    return (
      <Dynamic
        component={props.as}
        {...rest}
        aria-controls={`${baseId}-tabpanel-${index()}`}
        aria-disabled={props.disabled}
        aria-selected={selectedIndex() === index()}
        ref={ref}
        //@ts-ignore
        id={`${baseId}-tab-${index()}`}
        role="tab"
        classList={{
          [`${prefix}--tabs__nav-item`]: true,
          [`${prefix}--tabs__nav-link`]: true,
          [`${prefix}--tabs__nav-item--selected`]: selectedIndex() === index(),
          [`${prefix}--tabs__nav-item--disabled`]: props.disabled,
          [props.class!]: !!props.class,
        }}
        disabled={props.disabled}
        onClick={(
          evt: MouseEvent & { currentTarget: HTMLElement; target: Element }
        ) => {
          if (props.disabled) {
            return;
          }
          setSelectedIndex(index());
          callEventHandlerUnion(props.onClick, evt);
        }}
        onKeyDown={props.onKeyDown}
        tabIndex={selectedIndex() === index() ? "0" : "-1"}
        type="button"
      >
        {props.children}
      </Dynamic>
    );
  };
};

//TODO add IconTab component

export type TabPanelProps = {
  class?: string;
  ref?: HTMLElement | ((arg: HTMLElement) => any);
} & JSX.HTMLAttributes<HTMLDivElement>;

//@ts-ignore
const TabPanel: Component<TabPanelProps> = (props) => {
  const [, rest] = splitProps(props, ["children", "class", "ref"]);
  return (index: Accessor<number>) => {
    const prefix = usePrefix();
    let panel!: HTMLDivElement;

    const [tabIndex, setTabIndex] = createSignal("0");
    const { selectedIndex, baseId } = useContext(TabsContext)!;

    // tabindex should only be 0 if no interactive content in children
    onMount(() => {
      const interactiveContent = getInteractiveContent(panel);
      if (interactiveContent) {
        setTabIndex("-1");
      }
    });
    return (
      <div
        {...rest}
        aria-labelledby={`${baseId}-tab-${index()}`}
        id={`${baseId}-tabpanel-${index()}`}
        class={`${prefix}--tab-content`}
        classList={{ [props.class!]: !!props.class }}
        ref={(el) => {
          panel = el;
          //@ts-ignore
          props.ref && props.ref(el);
        }}
        role="tabpanel"
        tabIndex={tabIndex()}
        hidden={selectedIndex() !== index()}
      >
        {props.children}
      </div>
    );
  };
};

const TabPanels: Component = (props) => {
  const childs = childrenHelper(() => props.children);
  return () => (
    <For
      each={
        Array.isArray(childs())
          ? (childs() as unknown as Function[])
          : [childs() as unknown as Function]
      }
    >
      {(child, index) => {
        return child(index);
      }}
    </For>
  );
};

const noop = () => {};
type func<T = () => void> = () => T | undefined | void;

function usePressable(
  ref: () => HTMLElement,
  {
    onPress = noop,
    onPressIn = noop,
    onPressOut = noop,
    onLongPress = noop,
    delayLongPressMs = 500,
  }: {
    onPress?: func<(arg: { longPress: boolean }) => void>;
    onPressIn?: func;
    onPressOut?: func<(arg?: { longPress: boolean }) => void>;
    onLongPress?: func;
    delayLongPressMs?: number;
  }
) {
  let savedOnPress = onPress!();
  let savedOnPressIn = onPressIn!();
  let savedOnPressOut = onPressOut!();
  let savedOnLongPress = onLongPress!();
  const [pendingLongPress, setPendingLongPress] = createSignal(false);
  const [longPress, setLongPress] = createSignal(false);
  let state = {
    longPress: false,
  };

  createEffect(() => {
    savedOnPress = onPress!();
  });

  createEffect(() => {
    savedOnPressIn = onPressIn!();
  });

  createEffect(() => {
    savedOnPressOut = onPressOut!();
  });

  createEffect(() => {
    savedOnLongPress = onLongPress!();
  });

  createEffect(() => {
    const element = ref();

    // Fired when a pointer becomes active buttons state.
    function onPointerDown(event: PointerEvent) {
      setPendingLongPress(true);
      savedOnPressIn?.();
      event.preventDefault();
    }

    // Fired when a pointer is no longer active buttons state.
    function onPointerUp() {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut?.(state);
    }

    // A browser fires this event if it concludes the pointer
    // will no longer be able to generate events (for example
    // the related device is deactivated).
    function onPointerCancel() {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut?.();
      state.longPress = false;
    }

    // Fired when a pointer is moved out of the hit test
    // boundaries of an element. For pen devices, this event
    // is fired when the stylus leaves the hover range
    // detectable by the digitizer.
    function onPointerLeave() {
      setPendingLongPress(false);
      setLongPress(false);
      savedOnPressOut?.();
      state.longPress = false;
    }

    function onClick() {
      setLongPress(false);
      setPendingLongPress(false);
      savedOnPress?.(state);
      state.longPress = false;
    }

    // Certain devices treat long press events as context menu triggers
    function onContextMenu(event: MouseEvent) {
      event.preventDefault();
    }

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointercancel", onPointerCancel);
    element.addEventListener("pointerleave", onPointerLeave);
    element.addEventListener("click", onClick);
    element.addEventListener("contextmenu", onContextMenu);

    onCleanup(() => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointerup", onPointerUp);
      element.removeEventListener("pointercancel", onPointerCancel);
      element.removeEventListener("pointerleave", onPointerLeave);
      element.removeEventListener("click", onClick);
      element.removeEventListener("contextmenu", onContextMenu);
    });
  });

  createEffect(() => {
    if (pendingLongPress()) {
      const timeoutId = setTimeout(() => {
        setPendingLongPress(false);
        setLongPress(true);
      }, delayLongPressMs);

      onCleanup(() => {
        clearTimeout(timeoutId);
      });
    }
  });

  createEffect(() => {
    if (longPress()) {
      state.longPress = true;
      return savedOnLongPress?.();
    }
  });
}

/**
 * Helper function to setup the behavior when a button is "long pressed". This
 * function will take a ref to the tablist, a direction, and a setter for
 * scrollLeft and will update the scroll position within a
 * requestAnimationFrame.
 *
 * It returns a cleanup function to be run when the long press is
 * deactivated
 *
 * @param {RefObject} ref
 * @param {'forward' | 'backward'} direction
 * @param {Function} setScrollLeft
 * @returns {Function}
 */
function createLongPressBehavior(
  ref: () => HTMLElement,
  direction: "forward" | "backward",
  setScrollLeft: Setter<number>
) {
  // We manually override the scroll behavior to be "auto". If it is set as
  // smooth, this animation does not update correctly
  const el = ref();
  let defaultScrollBehavior = el.style.getPropertyValue("scroll-behavior");
  el.style.setProperty("scroll-behavior", "auto");

  const scrollDelta = direction === "forward" ? 5 : -5;
  let frameId: number | null = null;

  function tick() {
    ref().scrollLeft = ref().scrollLeft + scrollDelta;
    frameId = requestAnimationFrame(tick);
  }

  frameId = requestAnimationFrame(tick);

  onCleanup(() => {
    // Restore the previous scroll behavior
    el.style.setProperty("scroll-behavior", defaultScrollBehavior);

    // Make sure that our `scrollLeft` value is in sync with the existing
    // `ref` after our requestAnimationFrame loop above
    setScrollLeft(el.scrollLeft);

    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  });
}

export { Tabs, Tab, TabPanel, TabPanels, TabList };
