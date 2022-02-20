import { Search16 } from "./icons/Search16";
import { Close16 } from "./icons/Close16";
import { settings } from "carbon-components";
import { composeEventHandlers } from "./internal/events";
import keys from "./internal/keyboard/keys";
import { match } from "./internal/keyboard/match";
import { callEventHandlerUnion } from "./internal/callEventHandlerUnion";
import {
  Component,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";

const { prefix } = settings;

export type SearchProps = {
  /**
   * Specify an optional className to be applied to the container node
   */
  class?: string;
  /**
   * Specify a label to be read by screen readers on the "close" button
   */
  closeButtonLabelText?: string;
  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;
  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;
  /**
   * Specify a custom `id` for the input
   */
  id?: string;
  /**
   * Provide the label text for the Search icon
   */
  labelText?: JSX.Element;
  /**
   * Specify light version or default version of this control
   */
  light?: boolean;
  /**
   * Optional callback called when the search value changes.
   */
  onInput?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent | Event>;
  /**
   * Optional callback called when the search value is cleared.
   */
  onClear?: () => any;
  /**
   * Provide a handler that is invoked on the key down event for the input
   */
  onKeyDown?: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent>;
  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   */
  placeholder?: string;
  /**
   * Rendered icon for the Search.
   * Can be a React component class
   */
  renderIcon?: Component;
  /**
   * Specify the search size
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Optional prop to specify the type of the `<input>`
   */
  type?: string;
  /**
   * Specify the value of the `<input>`
   */
  value?: number | string;
} & JSX.HTMLAttributes<HTMLInputElement>;

export const Search: Component<SearchProps> = (props) => {
  props = mergeProps(
    {
      type: "text",
      placeholder: "",
      closeButtonLabelText: "Clear search input",
      onChange: () => {},
      onClear: () => {},
      id: `search__input__id_${Math.random().toString(36).substring(2)}`,
    },
    props
  );
  const [, rest] = splitProps(props, [
    "class",
    "type",
    "id",
    "placeholder",
    "labelText",
    "closeButtonLabelText",
    "size",
    "light",
    "disabled",
    "onInput",
    "onKeyDown",
    "renderIcon",
    "onClear",
  ]);
  let input!: HTMLInputElement;
  let magnifier!: HTMLDivElement;

  const [state, setState] = createSignal({
    hasContent: props.value || props.defaultValue || false,
    prevValue: props.value,
  });
  createEffect(() => {
    if (state().prevValue !== props.value) {
      setState({ hasContent: !!props.value, prevValue: props.value });
    }
  });

  const clearInput = (evt: Event & { currentTarget: HTMLElement; target: Element; }) => {
    if (!props.value) {
      input.value = "";
    } else {
      (evt.target as HTMLInputElement).value = "";
    }
    //@ts-ignore
    callEventHandlerUnion(props.onInput, evt);

    props.onClear?.();

    setState((obj) => ({ ...obj, hasContent: false }));
    input.focus();
  };

  const handleInput = (evt: Event & { currentTarget: HTMLInputElement; target: Element; }) => {
    setState((obj) => ({
      ...obj,
      hasContent: evt.currentTarget.value !== "",
    }));
  };

  const handleKeyDown = (evt: KeyboardEvent & { currentTarget: HTMLInputElement; target: Element; }) => {
    if (match(evt, keys.Escape)) {
      clearInput(evt);
    }
  };

  let enabled = true;

  const size = () => props.size;

  const searchId = `${props.id}-search`;
  const searchIcon = () =>
    props.renderIcon ? (
      <Dynamic
        component={props.renderIcon}
        //@ts-ignore
        class={`${prefix}--search-magnifier-icon`}
      />
    ) : (
      <Search16 className={`${prefix}--search-magnifier-icon`} />
    );

  return (
    <div
      role="search"
      aria-labelledby={searchId}
      classList={{
        [`${prefix}--search`]: true,
        [`${prefix}--search--sm`]: size() === "sm",
        // V11: change to md
        [`${prefix}--search--md`]: enabled ? size() === "md" : size() === "lg",
        // V11: change to lg
        [`${prefix}--search--xl`]: enabled ? size() === "lg" : size() === "xl",
        [`${prefix}--search--light`]: props.light,
        [`${prefix}--search--disabled`]: props.disabled,
        [props.class!]: !!props.class,
      }}
    >
      <div className={`${prefix}--search-magnifier`} ref={magnifier}>
        {searchIcon()}
      </div>
      <label id={searchId} for={props.id} class={`${prefix}--label`}>
        {props.labelText}
      </label>
      <input
        role="searchbox"
        autocomplete="off"
        {...rest}
        type={props.type}
        disabled={props.disabled}
        className={`${prefix}--search-input`}
        id={props.id}
        placeholder={props.placeholder}
        onInput={composeEventHandlers([props.onInput, handleInput])}
        onKeyDown={composeEventHandlers([props.onKeyDown, handleKeyDown])}
        ref={input}
      />
      <button
        classList={{
          [`${prefix}--search-close`]: true,
          [`${prefix}--search-close--hidden`]: !state().hasContent,
        }}
        disabled={props.disabled}
        onClick={clearInput}
        type="button"
        aria-label={props.closeButtonLabelText}
      >
        <Close16 />
      </button>
    </div>
  );
};
