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
  scrollIntoView?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

const TabList: Component<TabListProps> = (props) => {
  props = mergeProps(
    {
      activation: "automatic",
      contained: false,
    },
    props
  );
  const [, rest] = splitProps(props, [
    "activation",
    "aria-label",
    "children",
    "class",
    "light",
    "scrollIntoView",
    "contained",
  ]);
  const prefix = usePrefix();

  return () => {
    let ref!: HTMLDivElement;
    const childs = childrenHelper(() => props.children);
    const tabs: HTMLButtonElement[] = [];
    const tabsIndexes = useContext(TabsContext)!;
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
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    return (
      <div
        {...rest}
        aria-label={props["aria-label"]}
        ref={ref}
        role="tablist"
        //class={`${prefix}--tabs`}
        class={`${prefix}--tabs--scrollable__nav ${prefix}--tabs--scrollable`}
        classList={{
          //[`${prefix}--tabs--contained`]: contained,
          [`${prefix}--tabs--scrollable--container`]: props.contained,
          [`${prefix}--tabs--light`]: props.light,
          [props.class!]: !!props.class,
        }}
        onKeyDown={onKeyDown}
      >
        <style>
          {`.bx--tabs--scrollable.bx--tabs--scrollable--container .bx--tabs--scrollable__nav-item--selected.bx--tabs--scrollable__nav-link {
        box-shadow: inset 0 2px 0 0 #0f62fe;
        line-height: calc(3rem - (0.5rem * 2));
      }`}
        </style>
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
        //class={`${prefix}--tabs__nav-item ${prefix}--tabs__nav-link`}
        class={` ${prefix}--tabs--scrollable__nav-link ${prefix}--tabs--scrollable__nav-item`}
        classList={{
          [`${prefix}--tabs--scrollable__nav-item--selected`]:
            selectedIndex() === index(),
          [`${prefix}--tabs__nav-item--selected`]: selectedIndex() === index(),
          [`${prefix}--tabs__nav-item--disabled`]: props.disabled,
          [`${prefix}--tabs--scrollable__nav-item--disabled`]: props.disabled,
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

export { Tabs, Tab, TabPanel, TabPanels, TabList };
