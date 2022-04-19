import {
  Component,
  createEffect,
  createSignal,
  createUniqueId,
  JSX,
  mergeProps,
  splitProps,
} from "solid-js";
import { callEventHandlerUnion } from "../internal/callEventHandlerUnion";
import { usePrefix } from "../internal/usePrefix";
import { Search } from "../Search";

const translationKeys = {
  "carbon.table.toolbar.search.label": "Filter table",
  "carbon.table.toolbar.search.placeholder": "Filter table",
};
const translateWithId = (id: keyof typeof translationKeys) => {
  return translationKeys[id];
};

export type TableToolbarSearchProps = {
  /**
   * Provide an optional class name for the search container
   */
  class?: string;
  /**
   * Specifies if the search should initially render in an expanded state
   */
  defaultExpanded?: boolean;
  /**
   * Provide an optional default value for the Search component
   */
  defaultValue?: string;
  /**
   * Specifies if the search should be disabled
   */
  disabled?: boolean;
  /**
   * Specifies if the search should expand
   */
  expanded?: boolean;
  /**
   * Provide an optional id for the search container
   */
  id?: string;
  /**
   * Provide an optional label text for the Search component icon
   */
  labelText?: string;
  /**
   * Provide an optional function to be called when the search input loses focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second
   */
  onBlur?: (
    evt: FocusEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    },
    handler: (
      event: FocusEvent & {
        currentTarget: HTMLInputElement;
        target: Element;
      },
      value?: boolean
    ) => void
  ) => any;
  /**
   * Provide an optional hook that is called each time the input is updated
   */
  onChange?: JSX.EventHandler<HTMLElement, Event | InputEvent>;
  /**
   * Optional callback called when the search value is cleared.
   */
  onClear?: () => any;
  /**
   * Provide an optional hook that is called each time the input is expanded
   */
  onExpand?: (evt: FocusEvent, exapnded: boolean) => any;
  /**
   * Provide an optional function to be called when the search input gains focus, this will be
   * passed the event as the first parameter and a function to handle the expanding of the search
   * input as the second.
   */
  onFocus?: (
    event: FocusEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    },
    handler: (
      event: FocusEvent & {
        currentTarget: HTMLInputElement;
        target: Element;
      },
      value?: boolean
    ) => void
  ) => any;
  /**
   * Whether the search should be allowed to expand
   */
  persistent?: boolean;
  /**
   * Provide an optional placeholder text for the Search component
   */
  placeholder?: string;
  /**
   * Provide an optional className for the overall container of the Search
   */
  searchContainerClass?: string;
  /**
   * Optional prop to specify the tabIndex of the <Search> (in expanded state) or the container (in collapsed state)
   */
  tabIndex?: number | string;
  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId?: (id: keyof typeof translationKeys) => string;
};

export const TableToolbarSearch: Component<TableToolbarSearchProps> = (
  props
) => {
  const prefix = usePrefix();
  const [, rest] = splitProps(props, [
    "class",
    "searchContainerClass",
    "onChange",
    "onClear",
    "translateWithId",
    "placeholder",
    "labelText",
    "expanded",
    "defaultExpanded",
    "defaultValue",
    "disabled",
    "onExpand",
    "persistent",
    "id",
    "onBlur",
    "onFocus",
  ]);
  props = mergeProps(
    {
      tabIndex: "0",
      translateWithId,
      persistent: false,
      onClear: () => {},
    },
    props
  );

  const t = (id: keyof typeof translationKeys) => props.translateWithId!(id);

  const controlled = () => props.expanded !== undefined;
  const [expandedState, setExpandedState] = createSignal(
    props.defaultExpanded || !!props.defaultValue
  );
  const expanded = controlled() ? props.expanded : expandedState;
  const [value, setValue] = createSignal(props.defaultValue || "");
  const uniqueId = createUniqueId();

  const [focusTarget, setFocusTarget] = createSignal<HTMLElement>();

  createEffect(() => {
    if (focusTarget()) {
      focusTarget()?.querySelector("input")?.focus();
      setFocusTarget(undefined);
    }
  });

  const handleExpand = (
    event: FocusEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    },
    value = !expanded
  ) => {
    if (!props.disabled) {
      if (!controlled && !props.persistent) {
        setExpandedState(value);
      }
      if (props.onExpand) {
        props.onExpand(event, value);
      }
    }
  };

  return (
    <Search
      disabled={props.disabled}
      classList={{
        [props.searchContainerClass!]: !!props.searchContainerClass,
        [`${prefix}--toolbar-search-container-active`]: props.expanded,
        [`${prefix}--toolbar-search-container-disabled`]: props.disabled,
        [`${prefix}--toolbar-search-container-expandable`]: !props.persistent,
        [`${prefix}--toolbar-search-container-persistent`]: props.persistent,
        [props.class!]: !!props.class,
      }}
      value={value()}
      id={typeof props.id !== "undefined" ? props.id : uniqueId}
      labelText={props.labelText || t("carbon.table.toolbar.search.label")}
      placeholder={
        props.placeholder || t("carbon.table.toolbar.search.placeholder")
      }
      onInput={(
        e: Event & { currentTarget: HTMLInputElement; target: Element }
      ) => {
        setValue(e.currentTarget.value);
        callEventHandlerUnion(props.onChange, e);
      }}
      onClear={props.onClear}
      onFocus={(event) => {
        props.onFocus
          ? props.onFocus(event, handleExpand)
          : handleExpand(event, true);
      }}
      onBlur={(event) => {
        props.onBlur
          ? props.onBlur(event, handleExpand)
          : !value && handleExpand(event, false);
      }}
      {...rest}
    />
  );
};
