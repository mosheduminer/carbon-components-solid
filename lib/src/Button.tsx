import {
  Component,
  JSX,
  splitProps,
  createSignal,
  onCleanup,
  Show,
  mergeProps,
  onMount,
} from "solid-js";
import { matches } from "./internal/keyboard/match";
import keys from "./internal/keyboard/keys";
import { ButtonKindsType } from "./types";
import { composeEventHandlers } from "./internal/events";
import { Dynamic } from "solid-js/web";
import { createId } from "./internal/id";
import { usePrefix } from "./internal/usePrefix";

export type ButtonProps = {
  dangerDescription?: string;
  disabled?: boolean;
  role?: string;
  size?: "default" | "field" | "small" | "sm" | "md" | "lg" | "xl" | "2xl";
  renderIcon?: Component;
  hasIconOnly?: boolean;
  href?: string;
  iconDescription?: string;
  isExpressive?: boolean;
  isSelected?: boolean;
  tabIndex?: number;
  tooltipAlignment?: "start" | "center" | "end";
  tooltipPosition?: "top" | "start" | "bottom" | "left";
  type?: "button" | "reset" | "submit";
  ref?:
    | HTMLElement
    | HTMLButtonElement
    | ((el: HTMLElement | HTMLButtonElement) => void);
  kind?: ButtonKindsType;
} & JSX.HTMLAttributes<HTMLElement>;

const dangerButtonVariants = ["danger", "danger--tertiary", "danger--ghost"];

const buttonImage = (
  renderIcon?: Component<{ class?: string }>,
  iconDescription?: string
) => {
  const prefix = usePrefix();
  return (
    <Show when={renderIcon}>
      <Dynamic
        component={renderIcon}
        aria-label={iconDescription}
        class={`${prefix}--btn__icon`}
        aria-hidden="true"
      />
    </Show>
  );
};

export const Button: Component<ButtonProps> = (props) => {
  const prefix = usePrefix();
  let rest: Omit<JSX.HTMLAttributes<HTMLElement>, "ref">;
  [props, rest] = splitProps(props, [
    "children",
    "dangerDescription",
    "disabled",
    "role",
    "size",
    "renderIcon",
    "hasIconOnly",
    "href",
    "iconDescription",
    "isExpressive",
    "isSelected",
    "tabIndex",
    "tooltipAlignment",
    "tooltipPosition",
    "type",
    "onClick",
    "onBlur",
    "onFocus",
    "onMouseEnter",
    "onMouseLeave",
    "ref",
    "kind",
  ]);
  props = mergeProps(
    {
      tabIndex: 0,
      type: "button",
      disabled: false,
      kind: "primary",
      size: "default",
      dangerDescription: "danger",
      tooltipAlignment: "center",
      tooltipPosition: "top",
      isExpressive: false,
    },
    props
  );
  let tooltipRef: HTMLDivElement;
  let buttonRef: HTMLElement;
  let tooltipTimeout: number;
  const [allowTooltipVisibility, setAllowTooltipVisibility] =
    createSignal(false);
  const [isHovered, setIsHovered] = createSignal(false);
  const [isFocused, setIsFocused] = createSignal(false);
  const [classList, setClassList] = createSignal<{
    [key: string]: boolean | undefined;
  }>({
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--sm`]:
      (props.size === "small" && !props.isExpressive) ||
      (props.size === "sm" && !props.isExpressive),
    [`${prefix}--btn--md`]:
      (props.size === "field" && !props.isExpressive) ||
      (props.size === "md" && !props.isExpressive),
    [`${prefix}--btn--lg`]: props.size === "xl",
    [`${prefix}--btn--xl`]: props.size === "2xl",
    [`${prefix}--btn--${props.kind}`]: !!props.kind,
    [`${prefix}--btn--disabled`]: props.disabled,
    [`${prefix}--btn--expressive`]: props.isExpressive,
    [`${prefix}--tooltip--hidden`]:
      props.hasIconOnly && !allowTooltipVisibility(),
    [`${prefix}--tooltip--visible`]: isHovered(),
    [`${prefix}--btn--icon-only`]: props.hasIconOnly,
    [`${prefix}--btn--selected`]:
      props.hasIconOnly && props.isSelected && props.kind === "ghost",
    [`${prefix}--tooltip__trigger`]: props.hasIconOnly,
    [`${prefix}--tooltip--a11y`]: props.hasIconOnly,
    [`${prefix}--btn--icon-only--${props.tooltipPosition}`]:
      props.hasIconOnly && !!props.tooltipPosition,
    [`${prefix}--tooltip--align-${props.tooltipAlignment}`]:
      props.hasIconOnly && !!props.tooltipAlignment,
  });
  const potentiallyCloseTooltips = (evt: Event) =>
    setClassList((list) => ({
      ...list,
      [`${prefix}--tooltip--hidden`]: evt.currentTarget !== buttonRef,
    }));
  const handleFocus = (evt: FocusEvent) => {
    if (props.hasIconOnly) {
      potentiallyCloseTooltips(evt);
      setIsHovered(!isHovered);
      setIsFocused(true);
      setAllowTooltipVisibility(true);
    }
  };
  const handleBlur = () => {
    if (props.hasIconOnly) {
      setIsHovered(false);
      setIsFocused(false);
      setAllowTooltipVisibility(false);
    }
  };
  const handleMouseEnter = (evt: MouseEvent) => {
    if (props.hasIconOnly) {
      setIsHovered(true);
      tooltipTimeout && clearTimeout(tooltipTimeout);

      if (evt.target === tooltipRef) {
        setAllowTooltipVisibility(true);
        return;
      }

      potentiallyCloseTooltips(evt);

      setAllowTooltipVisibility(true);
    }
  };
  const handleMouseLeave = () => {
    if (!isFocused() && props.hasIconOnly) {
      tooltipTimeout = setTimeout(() => {
        setAllowTooltipVisibility(false);
        setIsHovered(false);
      }, 100) as unknown as number;
    }
  };
  const potentiallyPreventClickEvent = (evt: MouseEvent) => {
    // Prevent clicks on the tooltip from triggering the button click event
    if (evt.target === tooltipRef) {
      evt.preventDefault();
      return;
    }
  };
  const handleEscKeyDown = (event: KeyboardEvent) => {
    if (matches(event, [keys.Escape])) {
      setAllowTooltipVisibility(false);
      setIsHovered(false);
    }
  };
  onMount(() => document.addEventListener("keydown", handleEscKeyDown));
  onCleanup(() => document.removeEventListener("keydown", handleEscKeyDown));
  const assistiveId = createId();

  const assistiveText = () => {
    if (props.hasIconOnly)
      return (
        <div
          ref={tooltipRef}
          onMouseEnter={handleMouseEnter}
          class={`${prefix}--assistive-text`}
        >
          {props.iconDescription}
        </div>
      );
    else if (dangerButtonVariants.includes(props.kind!))
      return (
        <span id={assistiveId} class={`${prefix}--visually-hidden`}>
          {props.dangerDescription}
        </span>
      );
    else return undefined;
  };

  return (
    <Show
      when={!props.href || props.disabled}
      fallback={
        <a
          tabIndex={props.tabIndex}
          classList={classList()}
          ref={props.ref as HTMLAnchorElement}
          onMouseEnter={composeEventHandlers([
            props.onMouseEnter as () => any,
            handleMouseEnter,
          ])}
          onMouseLeave={composeEventHandlers([
            props.onMouseLeave as () => any,
            handleMouseLeave,
          ])}
          onFocus={composeEventHandlers([
            props.onFocus as () => any,
            handleFocus,
          ])}
          onBlur={composeEventHandlers([props.onBlur as () => any, handleBlur])}
          onClick={composeEventHandlers([
            potentiallyPreventClickEvent,
            props.onClick as () => any,
          ])}
          {...rest}
        >
          {assistiveText()}
          {props.children}
          {buttonImage(props.renderIcon, props.iconDescription)}
        </a>
      }
    >
      <button
        tabIndex={props.tabIndex}
        classList={classList()}
        ref={props.ref as HTMLButtonElement}
        type={props.type}
        disabled={props.disabled}
        aria-describedby={
          dangerButtonVariants.includes(props.kind!) ? assistiveId : undefined
        }
        aria-pressed={
          props.hasIconOnly && props.kind === "ghost"
            ? props.isSelected
            : undefined
        }
        onMouseEnter={composeEventHandlers([
          props.onMouseEnter as () => any,
          handleMouseEnter,
        ])}
        onMouseLeave={composeEventHandlers([
          props.onMouseLeave as () => any,
          handleMouseLeave,
        ])}
        onFocus={composeEventHandlers([
          props.onFocus as () => any,
          handleFocus,
        ])}
        onBlur={composeEventHandlers([props.onBlur as () => any, handleBlur])}
        onClick={composeEventHandlers([
          potentiallyPreventClickEvent,
          props.onClick as () => any,
        ])}
        {...rest}
      >
        {assistiveText()}
        {props.children}
        {buttonImage(props.renderIcon, props.iconDescription)}
      </button>
    </Show>
  );
};
