import { settings } from "carbon-components";
import { Component, createSignal, JSX, For, children, splitProps, mergeProps } from "solid-js";
import { ContentSwitchProps } from "./ContentSwitch";
import keys from "./internal/keyboard/keys";
import { matches } from "./internal/keyboard/match";
import { getNextIndex } from "./internal/keyboard/navigation";

const { prefix } = settings;

export type ContentSwitcherOnChangeArgs = { index: number, name: string, text: string, key?: string | number };

export type ContentSwitcherProps = {
  class?: string;
  onChange: (args: ContentSwitcherOnChangeArgs) => any;
  selectedIndex?: number; // eslint-disable-line no-unused-vars
  selectionMode?: "automatic" | "manual"; // eslint-disable-line no-unused-vars
  size?: "sm" | "md" | "lg" | "xl";
};

export const ContentSwitcher: Component<ContentSwitcherProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLDivElement>;
  [props, rest] = splitProps(props, ["children", "class", "onChange", "selectedIndex", "selectionMode", "size"]);
  props = mergeProps({ selectedIndex: 0, selectionMode: "automatic", onChange: () => { } }, props);
  const [selected, setSelected] = createSignal(props.selectedIndex!);
  const switchRefs: HTMLElement[] = [];
  const handleChildChange = (data: ContentSwitcherOnChangeArgs) => {
    const { selectionMode } = props;
    // the newly selected child index
    const { index } = data;
    const { key } = data;

    if (key !== undefined && matches(key, [keys.ArrowRight, keys.ArrowLeft])) {
      const nextIndex = getNextIndex(key, index, switchRefs.length)!;
      if (selectionMode === "manual") {
        const switchRef = switchRefs[nextIndex];
        switchRef && switchRef.focus();
      } else {
        setSelected(nextIndex);
        const switchRef = switchRefs[selected()];
        switchRef && switchRef.focus();
        props.onChange({
          ...data,
          index: selected(),
          name: data.name,
          text: data.text,
        });
      }
    } else if (selected() !== index) {
      setSelected(index);
      const switchRef = switchRefs[index];
      switchRef && switchRef.focus();
      props.onChange(data);
    }
  };

  const chlds = children(() => props.children) as unknown as () => ContentSwitchProps[];

  return (
    <div {...rest} classList={{
      [`${prefix}--content-switcher--${props.size}`]: !!props.size,
      [props.class!]: !!props.class,
    }} class={`${prefix}--content-switcher`} role="tablist">
      <For each={chlds()}>
        {(childProps, index) => {
          let rest: JSX.HTMLAttributes<HTMLButtonElement>;
          [childProps, rest] = splitProps(childProps, [
            "text",
            "disabled",
            "name",
          ]);
          const slctd = selected() === index();
          return <button
            type="button"
            ref={(el => {
              switchRefs[index()] = el;
              typeof childProps.ref === "function" ? childProps.ref(el) : childProps.ref = el;
            })}
            disabled={childProps.disabled}
            role="tab"
            tabIndex={slctd ? '0' : '-1'}
            aria-selected={slctd}
            onClick={(e) => {
              e.preventDefault()
              handleChildChange({
                index: index(),
                name: childProps.name,
                text: childProps.text,
              });
            }}
            onKeyDown={(event) => handleChildChange({ index: index(), name: childProps.name, text: childProps.text, key: event.key || event.which })}
            {...rest}
            class={`${prefix}--content-switcher-btn`}
            classList={{ [`${prefix}--content-switcher--selected`]: slctd, [childProps.class!]: !!childProps.class }}>
            <span className={`${prefix}--content-switcher__label`} title={childProps.text}>
              {childProps.text}
            </span>
          </button>
        }}
      </For>
    </div>
  );
};
