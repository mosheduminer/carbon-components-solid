import {
  Component,
  createSignal,
  JSX,
  mergeProps,
  splitProps,
  children,
  For,
  createEffect,
  onCleanup,
  mapArray,
} from "solid-js";
import { composeEventHandlers } from "./internal/events";
import keys from "./internal/keyboard/keys";
import { matches } from "./internal/keyboard/match";
import wrapFocus from "./internal/wrapFocus";
import { Close20 } from "./icons/icons/Close20";
import { ButtonSet } from "./ButtonSet";
import { Button } from "./Button";
import { callEventHandlerUnion } from "./internal/callEventHandlerUnion";
import { usePrefix } from "./internal/usePrefix";
import { createDerivedSignal } from "./internal/derivedSignal";

export type ComposedModalProps = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  class?: string;
  containerClass?: string;
  danger?: boolean;
  onClose?: (e: KeyboardEvent) => boolean;
  onKeyDown?: JSX.EventHandlerUnion<HTMLDivElement, KeyboardEvent>;
  primaryClassName?: string;
  open?: boolean;
  preventCloseOnClickOutside?: boolean;
  selectorPrimaryFocus?: string;
  selectorsFloatingMenus?: string[];
  size?: "xs" | "sm" | "md" | "lg";
};

export const ComposedModal: Component<ComposedModalProps> = (props) => {
  let rest;
  [props, rest] = splitProps(props, [
    "aria-label",
    "aria-labelledby",
    "children",
    "class",
    "containerClass",
    "danger",
    "onClose",
    "onKeyDown",
    "open",
    "preventCloseOnClickOutside",
    "primaryClassName",
    "selectorPrimaryFocus",
    "selectorsFloatingMenus",
    "size",
  ]);
  props = mergeProps(
    { onKeyDown: () => { }, selectorPrimaryFocus: "[data-modal-primary-focus]" },
    props
  );

  const prefix = usePrefix();

  const [open, setOpen] = createDerivedSignal(() => props.open);
  let outerModal!: HTMLDivElement;
  let innerModal!: HTMLDivElement;
  let buttonRef: HTMLButtonElement;
  let startSentinel!: HTMLSpanElement;
  let endSentinel!: HTMLSpanElement;
  let beingOpen = false;

  const focusButton = (focusContainerElement: HTMLElement) => {
    if (focusContainerElement) {
      const primaryFocusElement = focusContainerElement.querySelector(
        props.selectorPrimaryFocus!
      );
      if (primaryFocusElement) {
        (primaryFocusElement as HTMLElement).focus();
        return;
      }
      if (buttonRef) {
        buttonRef.focus();
      }
    }
  };

  const handleTransitionEnd = (evt: TransitionEvent) => {
    if (outerModal.offsetWidth && outerModal.offsetHeight && beingOpen) {
      focusButton(evt.currentTarget as HTMLElement);
      beingOpen = false;
    }
  };

  const handleClick = (evt: MouseEvent) => {
    if (
      !innerModal.contains(evt.target as Node) &&
      props.preventCloseOnClickOutside
    ) {
      return;
    }
    if (innerModal && !innerModal.contains(evt.target as Node)) {
      closeModal(evt as Event);
    }
  };

  const handleBlur = ({
    target: oldActiveNode,
    relatedTarget: currentActiveNode,
  }: FocusEvent) => {
    const { open, selectorsFloatingMenus } = props;
    if (open && currentActiveNode && oldActiveNode) {
      const bodyNode = innerModal;
      const startSentinelNode = startSentinel;
      const endSentinelNode = endSentinel;
      wrapFocus({
        bodyNode,
        startTrapNode: startSentinelNode,
        endTrapNode: endSentinelNode,
        currentActiveNode: currentActiveNode as Element,
        oldActiveNode: oldActiveNode as Element,
        selectorsFloatingMenus: selectorsFloatingMenus!,
      });
    }
  };

  const closeModal = (e: Event) => {
    const { onClose } = props;
    if (!onClose || onClose(e as KeyboardEvent) !== false) {
      setOpen(false);
    }
  };

  const handleKeyDown = composeEventHandlers<KeyboardEvent, HTMLDivElement>([
    (e) => {
      // Esc key
      if (matches(e, [keys.Escape])) closeModal(e);
    },
    props.onKeyDown!,
  ]);

  createEffect<boolean>((prev) => {
    const current = open();
    if (!prev && current) {
      beingOpen = true;
    } else if (prev !== current) {
      beingOpen = false;
    }
    if (prev !== current) {
      document.body.classList.toggle(
        `${prefix}--body--with-modal-open`,
        current
      );
    }
    return current;
  });

  onCleanup(() => {
    document.body.classList.toggle(`${prefix}--body--with-modal-open`, false);
  });

  const chlds = children(() => props.children);
  let ariaLabel: string | undefined;
  const childrenWithProps = mapArray(chlds as () => ((() => JSX.FunctionElement) | JSX.Element)[],
    (el) => {
      if (typeof el === "function") {
        const ret = (el as (props: any) => JSX.FunctionElement)({
          closeModal,
          ref: buttonRef,
        });
        if (Array.isArray(ret)) {
          ariaLabel = ret[0] as string | undefined;
          return ret[1];
        }
        return ret;
      } else {
        return el;
      }
    });

  return (
    <div
      {...rest}
      role="presentation"
      ref={outerModal}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onTransitionEnd={open() ? handleTransitionEnd : undefined}
      class={`${prefix}--modal`}
      classList={{
        "is-visible": open(),
        [props.class!]: !!props.class,
        [`${prefix}--modal--danger`]: props.danger,
      }}
    >
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      <span
        ref={startSentinel}
        tabIndex="0"
        role="link"
        class={`${prefix}--visually-hidden`}
      >
        Focus sentinel
      </span>
      <div
        ref={innerModal}
        class={`${prefix}--modal-container`}
        classList={{
          [`${prefix}--modal-container--${props.size}`]: !!props.size,
          [props.containerClass!]: !!props.containerClass,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={props["aria-label"] ? props["aria-label"] : ariaLabel}
        aria-labelledby={props["aria-labelledby"]}
      >
        {childrenWithProps()}
      </div>
      {/* Non-translatable: Focus-wrap code makes this `<span>` not actually read by screen readers */}
      <span
        ref={endSentinel}
        tabIndex="0"
        role="link"
        class={`${prefix}--visually-hidden`}
      >
        Focus sentinel
      </span>
    </div>
  );
};

export type ModalHeaderProps = {
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  class?: string;
  closeClass?: string;
  closeIconClass?: string;
  iconDescription?: string;
  label: JSX.Element;
  labelClass?: string;
  title?: JSX.Element;
  titleClass?: string;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, "onClick">;

export const ModalHeader = ((props: ModalHeaderProps) => {
  const prefix = usePrefix();
  let rest: JSX.HTMLAttributes<HTMLDivElement>;
  [props, rest] = splitProps(props, [
    "class",
    "children",
    "onClick",
    "closeClass",
    "closeIconClass",
    "iconDescription",
    "label",
    "labelClass",
    "title",
    "titleClass",
  ]);
  props = mergeProps({ iconDescription: "Close", onClick: () => { } }, props);
  return (innerProps: { closeModal: (e: MouseEvent) => any }) => [
    () => props.label,
    <div
      classList={{
        [props.class!]: !!props.class,
      }}
      class={`${prefix}--modal-header`}
      {...rest}
    >
      {props.label && (
        <h2
          classList={{ [props.labelClass!]: !!props.labelClass }}
          class={`${prefix}--modal-header__label ${prefix}--type-delta`}
        >
          {props.label}
        </h2>
      )}

      {props.title && (
        <h3
          class={`${prefix}--modal-header__heading ${prefix}--type-beta`}
          classList={{ [props.titleClass!]: !!props.titleClass }}
        >
          {props.title}
        </h3>
      )}

      {props.children}

      <button
        onClick={composeEventHandlers([innerProps.closeModal, props.onClick])}
        class={`${prefix}--modal-close`}
        classList={{ [props.closeClass!]: !!props.closeClass }}
        title={props.iconDescription}
        aria-label={props.iconDescription}
        type="button"
      >
        <Close20
          class={`${prefix}--modal-close__icon`}
          classList={{ [props.closeIconClass!]: !!props.closeIconClass }}
        />
      </button>
    </div>,
  ];
}) as Component<ModalHeaderProps>;

export type ModalBodyProps = {
  ariaLabel?: string;
  class?: string;
  hasForm?: boolean;
  hasScrollingContent?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const ModalBody: Component<ModalBodyProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLDivElement>;
  [props, rest] = splitProps(props, [
    "children",
    "class",
    "hasForm",
    "hasScrollingContent",
  ]);
  const prefix = usePrefix();
  const hasScrollingContentProps = () =>
    props.hasScrollingContent ? { tabIndex: 0, role: "region" } : {};
  return (
    <>
      <div
        class={`${prefix}--modal-content`}
        classList={{
          [`${prefix}--modal-content--with-form`]: props.hasForm,
          [`${prefix}--modal-scroll-content`]: props.hasScrollingContent,
          [props.class!]: !!props.class,
        }}
        {...hasScrollingContentProps}
        {...rest}
      >
        {props.children}
      </div>
      {props.hasScrollingContent && (
        <div class={`${prefix}--modal-content--overflow-indicator`} />
      )}
    </>
  );
};

export type ModalFooterProps = {
  class?: string;
  danger?: boolean;
  onRequestClose?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  onRequestSubmit?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  primaryButtonDisabled?: boolean;
  primaryButtonText?: string;
  primaryClass?: string;
  secondaryButtonText?: string;
  secondaryButtons?: {
    buttonText: string;
    onClick: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  }[];
  secondaryClass?: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const ModalFooter = ((props: ModalFooterProps) => {
  let rest: JSX.HTMLAttributes<HTMLDivElement>;
  [props, rest] = splitProps(props, [
    "children",
    "class",
    "danger",
    "onRequestClose",
    "onRequestSubmit",
    "primaryButtonDisabled",
    "primaryButtonText",
    "primaryClass",
    "secondaryButtonText",
    "secondaryButtons",
    "secondaryClass",
  ]);
  props = mergeProps(
    { onRequestClose: () => { }, onRequestSubmit: () => { } },
    props
  );

  const SecondaryButtonSet = (innerProps: {
    closeModal: (e: MouseEvent) => any;
  }) => {
    const handleRequestClose = (
      evt: MouseEvent & {
        currentTarget: HTMLElement;
        target: Element;
      }
    ) => {
      innerProps.closeModal(evt);
      if (props.onRequestClose)
        callEventHandlerUnion(props.onRequestClose, evt);
    };

    if (
      Array.isArray(props.secondaryButtons) &&
      props.secondaryButtons.length <= 2
    ) {
      return (
        <For each={props.secondaryButtons}>
          {({ buttonText, onClick: onButtonClick }, i) => {
            return (
              <Button
                class={props.secondaryClass}
                kind="secondary"
                onClick={onButtonClick || handleRequestClose}
              >
                {buttonText}
              </Button>
            );
          }}
        </For>
      );
    }
    if (props.secondaryButtonText) {
      return (
        <Button
          class={props.secondaryClass}
          onClick={handleRequestClose}
          kind="secondary"
        >
          {props.secondaryButtonText}
        </Button>
      );
    }
    return undefined;
  };

  return (innerProps: {
    ref: HTMLElement | ((e: HTMLElement) => any);
    closeModal: (e: MouseEvent) => any;
  }) => {
    const prefix = usePrefix();
    return (
      <ButtonSet
        classList={{
          [`${prefix}--modal-footer`]: true,
          [props.class!]: !!props.class,
          [`${prefix}--modal-footer--three-button`]:
            Array.isArray(props.secondaryButtons) &&
            props.secondaryButtons.length === 2,
        }}
        {...rest}
      >
        <SecondaryButtonSet closeModal={innerProps.closeModal} />
        {props.primaryButtonText && (
          <Button
            onClick={props.onRequestSubmit}
            class={props.primaryClass}
            disabled={props.primaryButtonDisabled}
            kind={props.danger ? "danger" : "primary"}
            ref={innerProps.ref}
          >
            {props.primaryButtonText}
          </Button>
        )}
        {props.children}
      </ButtonSet>
    );
  };
}) as Component<ModalFooterProps>;
