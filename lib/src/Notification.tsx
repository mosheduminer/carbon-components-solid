import {
  Component,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
  Show,
  splitProps,
} from "solid-js";
import { matches } from "./internal/keyboard/match";
import keys from "./internal/keyboard/keys";
import { usePrefix } from "./internal/usePrefix";
import { Button, ButtonProps } from "./Button";
import { Dynamic } from "solid-js/web";
import { Close20 } from "./icons/Close20";
import { ErrorFilled16 } from "./icons/ErrorFilled16";
import { CheckmarkFilled16 } from "./icons/CheckmarkFilled16";
import { WarningFilled16 } from "./icons/WarningFilled16";
import { WarningAltFilled16 } from "./icons/WarningAltFilled16";
import { InformationFilled16 } from "./icons/InformationFilled16";
import { InformationSquareFilled16 } from "./icons/InformationSquareFilled16";
import { callEventHandlerUnion } from "./internal/callEventHandlerUnion";

/**
 * Conditionally call a callback when the escape key is pressed
 */
function useEscapeToClose(
  ref: () => HTMLElement,
  callback: (
    event: KeyboardEvent & {
      currentTarget: HTMLElement;
      target: Element;
    }
  ) => any,
  override = true
) {
  const handleKeyDown = (event: KeyboardEvent) => {
    const el = ref();
    // The callback should only be called when focus is on or within the container
    const elementContainsFocus =
      (el && document.activeElement === el) ||
      el.contains(document.activeElement);

    if (matches(event, [keys.Escape]) && override && elementContainsFocus) {
      //@ts-ignore
      callback(event);
    }
  };

  createEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => document.removeEventListener("keydown", handleKeyDown, false);
  });
}

type NotificationActionButtonProps = {
  /**
   * Specify the content of the notification action button.
   */
  children?: JSX.Element;
  /**
   * Specify an optional class to be applied to the notification action button
   */
  class?: string;
  /**
   * Specify if the visual treatment of the button should be for an inline notification
   */
  inline?: boolean;
  /**
   * Optionally specify a click handler for the notification action button.
   */
  onClick?: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
} & ButtonProps;

export function NotificationActionButton(props: NotificationActionButtonProps) {
  const prefix = usePrefix();
  const [, rest] = splitProps(props, [
    "children",
    "class",
    "onClick",
    "inline",
  ]);

  return (
    <Button
      classList={{
        [`${prefix}--actionable-notification__action-button`]: true,
        [props.class!]: !!props.class,
      }}
      kind={props.inline ? "ghost" : "tertiary"}
      onClick={props.onClick}
      size="sm"
      {...rest}
    >
      {props.children}
    </Button>
  );
}

type NotificationButtonProps = {
  /**
   * Specify a label to be read by screen readers on the notification button
   */
  "aria-label"?: string;
  /**
   * Specify an optional class to be applied to the notification button
   */
  class?: string;
  /**
   * Specify an optional icon for the Button through a string,
   * if something but regular "close" icon is desirable
   */
  name?: string;
  /**
   * Specify the notification type
   */
  notificationType?: "toast" | "inline" | "actionable";
  /**
   * Optional prop to allow overriding the icon rendering.
   * Can be a React component class
   */
  renderIcon?: Component;
  /**
   * Optional prop to specify the type of the Button
   */
  type?: string;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function NotificationButton(props: NotificationButtonProps) {
  const [, rest] = splitProps(props, [
    "aria-label",
    "class",
    "type",
    "renderIcon",
    "name",
    "notificationType",
  ]);
  props = mergeProps(
    {
      "aria-label": "close notification",
      notificationType: "toast" as const,
      type: "button" as const,
      renderIcon: Close20,
    },
    props
  );
  const prefix = usePrefix();

  return (
    <button
      {...rest}
      type={props.type}
      aria-label={props["aria-label"]}
      title={props["aria-label"]}
      classList={{
        [`${prefix}--${props.notificationType}-notification__close-button`]:
          !!props.notificationType,
        [props.class!]: !!props.class,
      }}
    >
      <Dynamic
        component={props.renderIcon}
        //@ts-ignore
        classList={{
          [`${prefix}--${props.notificationType}-notification__close-icon`]:
            props.notificationType,
        }}
        name={props.name}
      />
    </button>
  );
}

const iconTypes = {
  error: ErrorFilled16,
  success: CheckmarkFilled16,
  warning: WarningFilled16,
  ["warning-alt"]: WarningAltFilled16,
  info: InformationFilled16,
  ["info-square"]: InformationSquareFilled16,
};

type NotificationIconProps = {
  iconDescription: string;
  kind: keyof typeof iconTypes;
  notificationType: "inline" | "toast";
};

function NotificationIcon(props: NotificationIconProps) {
  const prefix = usePrefix();
  return (
    <Dynamic
      component={iconTypes[props.kind]}
      class={`${prefix}--${props.notificationType}-notification__icon`}
    >
      <title>{props.iconDescription}</title>
    </Dynamic>
  );
}

type ToastNotificationProps = {
  /**
   * Provide a description for "close" icon button that can be read by screen readers
   */
  "aria-label"?: string;
  /**
   * Specify the caption
   */
  caption?: string;
  /**
   * Specify the content
   */
  children?: JSX.Element;
  /**
   * Specify an optional class to be applied to the notification box
   */
  class?: string;
  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton: boolean;
  /**
   * Specify what state the notification represents
   */
  kind?: keyof typeof iconTypes;
  /**
   * Specify whether you are using the low contrast variant of the ToastNotification.
   */
  lowContrast?: boolean;
  /**
   * Provide a function that is called when menu is closed
   */
  onClose?: Function;
  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  /**
   * By default, this value is "status". You can also provide an alternate
   * role if it makes sense from the accessibility-side
   */
  role?: "alert" | "log" | "status";
  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription?: string;
  /**
   * Specify the sub-title
   */
  subtitle?: string;
  /**
   * Specify an optional duration the notification should be closed in
   */
  timeout?: number;
  /**
   * Specify the title
   */
  title?: string;
};

const toastNotificationDefaultProps = {
  kind: "error",
  role: "status",
  onCloseButtonClick: () => {},
  hideCloseButton: false,
  timeout: 0,
};

export function ToastNotification(props: ToastNotificationProps) {
  const [, rest] = splitProps(props, [
    "role",
    "onClose",
    "onCloseButtonClick",
    "statusIconDescription",
    "class",
    "children",
    "kind",
    "lowContrast",
    "hideCloseButton",
    "timeout",
    "title",
    "caption",
    "subtitle",
  ]);
  props = mergeProps(toastNotificationDefaultProps, props);
  const [isOpen, setIsOpen] = createSignal(true);
  const prefix = usePrefix();

  const handleClose = (evt: MouseEvent) => {
    if (!props.onClose || props.onClose(evt) !== false) {
      setIsOpen(false);
    }
  };
  let ref!: HTMLDivElement;

  function handleCloseButtonClick(
    event: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
  ) {
    callEventHandlerUnion(props.onCloseButtonClick, event);
    handleClose(event);
  }

  let savedOnClose = props.onClose;

  createEffect(() => {
    savedOnClose = props.onClose;
  });

  createEffect(() => {
    if (!props.timeout) {
      return;
    }

    const timeoutId = window.setTimeout((event: any) => {
      setIsOpen(false);
      if (savedOnClose) {
        savedOnClose(event);
      }
    }, props.timeout);
    onCleanup(() => {
      window.clearTimeout(timeoutId);
    });
  });

  return (
    <Show when={isOpen()}>
      <div
        ref={ref}
        {...rest}
        role={props.role}
        classList={{
          [`${prefix}--toast-notification`]: true,
          [`${prefix}--toast-notification--low-contrast`]: !!props.lowContrast,
          [`${prefix}--toast-notification--${props.kind}`]: !!props.kind,
          [props.class!]: !!props.class,
        }}
      >
        <NotificationIcon
          notificationType="toast"
          kind={props.kind!}
          iconDescription={props.statusIconDescription || `${props.kind} icon`}
        />
        <div class={`${prefix}--toast-notification__details`}>
          {props.title && (
            <div class={`${prefix}--toast-notification__title`}>
              {props.title}
            </div>
          )}
          {props.subtitle && (
            <div class={`${prefix}--toast-notification__subtitle`}>
              {props.subtitle}
            </div>
          )}
          {props.caption && (
            <div class={`${prefix}--toast-notification__caption`}>
              {props.caption}
            </div>
          )}
          {props.children}
        </div>
        {!props.hideCloseButton && (
          <NotificationButton
            notificationType="toast"
            onClick={handleCloseButtonClick}
            aria-hidden="true"
            tabIndex="-1"
          />
        )}
      </div>
    </Show>
  );
}

type InlineNotificationProps = {
  /**
   * Specify the content
   */
  children: JSX.Element;
  /**
   * Specify an optional className to be applied to the notification box
   */
  class?: string;
  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton?: boolean;
  /**
   * Specify what state the notification represents
   */
  kind?: keyof typeof iconTypes;
  /**
   * Specify whether you are using the low contrast variant of the InlineNotification.
   */
  lowContrast?: boolean;
  /**
   * Provide a function that is called when menu is closed
   */
  onClose?: Function;
  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  /**
   * By default, this value is "status". You can also provide an alternate
   * role if it makes sense from the accessibility-side.
   */
  role?: "alert" | "log" | "status";
  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription?: string;
  /**
   * Specify the sub-title
   */
  subtitle?: string;
  /**
   * Specify the title
   */
  title?: string;
};

const inlineNotificationDefaultProps = {
  kind: "error",
  role: "status",
  onCloseButtonClick: () => {},
  hideCloseButton: false,
};

export function InlineNotification(props: InlineNotificationProps) {
  const [, rest] = splitProps(props, [
    "children",
    "title",
    "subtitle",
    "role",
    "onClose",
    "onCloseButtonClick",
    "statusIconDescription",
    "class",
    "kind",
    "lowContrast",
    "hideCloseButton",
  ]);
  props = mergeProps(inlineNotificationDefaultProps, props);
  const [isOpen, setIsOpen] = createSignal(true);
  const prefix = usePrefix();

  const handleClose = (evt: MouseEvent) => {
    if (!props.onClose || props.onClose(evt) !== false) {
      setIsOpen(false);
    }
  };
  let ref!: HTMLDivElement;

  function handleCloseButtonClick(
    event: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
  ) {
    callEventHandlerUnion(props.onCloseButtonClick, event);

    handleClose(event);
  }

  return (
    <Show when={isOpen()}>
      <div
        ref={ref}
        {...rest}
        role={props.role}
        classList={{
          [`${prefix}--inline-notification`]: true,
          [`${prefix}--inline-notification--low-contrast`]: !!props.lowContrast,
          [`${prefix}--inline-notification--${props.kind}`]: !!props.kind,
          [`${prefix}--inline-notification--hide-close-button`]:
            props.hideCloseButton,
          [props.class!]: !!props.class,
        }}
      >
        <div class={`${prefix}--inline-notification__details`}>
          <NotificationIcon
            notificationType="inline"
            kind={props.kind!}
            iconDescription={
              props.statusIconDescription || `${props.kind} icon`
            }
          />
          <div class={`${prefix}--inline-notification__text-wrapper`}>
            {props.title && (
              <div class={`${prefix}--inline-notification__title`}>
                {props.title}
              </div>
            )}
            {props.subtitle && (
              <div class={`${prefix}--inline-notification__subtitle`}>
                {props.subtitle}
              </div>
            )}
            {props.children}
          </div>
        </div>
        {!props.hideCloseButton && (
          <NotificationButton
            notificationType="inline"
            onClick={handleCloseButtonClick}
            aria-hidden="true"
            tabIndex="-1"
          />
        )}
      </div>
    </Show>
  );
}

type ActionableNotificationProps = {
  /**
   * Pass in the action button label that will be rendered within the ActionableNotification.
   */
  actionButtonLabel: string;
  /**
   * Provide a description for "close" icon button that can be read by screen readers
   */
  "aria-label": string;
  /**
   * Specify the caption
   */
  caption?: string;
  /**
   * Specify the content
   */
  children: JSX.Element;
  /**
   * Specify an optional class to be applied to the notification box
   */
  class?: string;
  /**
   * Specify if pressing the escape key should close notifications
   */
  closeOnEscape?: boolean;
  /**
   * Specify if focus should be moved to the component when the notification contains actions
   */
  hasFocus?: boolean;
  /**
   * Specify the close button should be disabled, or not
   */
  hideCloseButton?: boolean;
  /*
   * Specify if the notification should have inline styling applied instead of toast
   */
  inline?: boolean;
  /**
   * Specify what state the notification represents
   */
  kind: keyof typeof iconTypes;
  /**
   * Specify whether you are using the low contrast variant of the ActionableNotification.
   */
  lowContrast?: boolean;
  /**
   * Provide a function that is called when the action is clicked
   */
  onActionButtonClick?: JSX.EventHandlerUnion<HTMLElement, Event>;
  /**
   * Provide a function that is called when menu is closed
   */
  onClose?: Function;
  /**
   * Provide a function that is called when the close button is clicked
   */
  onCloseButtonClick?: Function;
  /**
   * By default, this value is "alertdialog". You can also provide an alternate
   * role if it makes sense from the accessibility-side.
   */
  role?: JSX.HTMLAttributes<HTMLDivElement>["role"];
  /**
   * Provide a description for "status" icon that can be read by screen readers
   */
  statusIconDescription?: string;
  /**
   * Specify the sub-title
   */
  subtitle?: string;
  /**
   * Specify the title
   */
  title?: string;
};

const actionableNotificationDefaultProps = {
  kind: "error",
  role: "alertdialog",
  onCloseButtonClick: () => {},
  hideCloseButton: false,
  hasFocus: true,
  closeOnEscape: true,
  inline: false,
};

export function ActionableNotification(props: ActionableNotificationProps) {
  const [, rest] = splitProps(props, [
    "actionButtonLabel",
    "aria-label",
    "children",
    "role",
    "onActionButtonClick",
    "onClose",
    "onCloseButtonClick",
    "statusIconDescription",
    "class",
    "inline",
    "kind",
    "lowContrast",
    "hideCloseButton",
    "hasFocus",
    "closeOnEscape",
    "title",
    "subtitle",
  ]);
  props = mergeProps(actionableNotificationDefaultProps, props);
  const [isOpen, setIsOpen] = createSignal(true);
  const prefix = usePrefix();

  let ref!: HTMLDivElement;
  createEffect(() => {
    if (ref && props.hasFocus) {
      ref.focus();
    }
  });

  const handleClose = (evt: MouseEvent) => {
    if (!props.onClose || props.onClose(evt) !== false) {
      setIsOpen(false);
    }
  };
  useEscapeToClose(() => ref, handleCloseButtonClick, props.closeOnEscape);

  function handleCloseButtonClick(
    event: (MouseEvent | KeyboardEvent) & {
      currentTarget: HTMLElement;
      target: Element;
    }
  ) {
    callEventHandlerUnion(props.onActionButtonClick, event);
    handleClose(event as MouseEvent);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      {...rest}
      ref={ref}
      role={props.role}
      classList={{
        [`${prefix}--actionable-notification`]: true,
        [`${prefix}--actionable-notification--toast`]: !props.inline,
        [`${prefix}--actionable-notification--low-contrast`]:
          !!props.lowContrast,
        [`${prefix}--actionable-notification--${props.kind}`]: !!props.kind,
        [`${prefix}--actionable-notification--hide-close-button`]:
          props.hideCloseButton,
      }}
    >
      <div className={`${prefix}--actionable-notification__details`}>
        <NotificationIcon
          notificationType={props.inline ? "inline" : "toast"}
          kind={props.kind}
          iconDescription={props.statusIconDescription || `${props.kind} icon`}
        />
        <div className={`${prefix}--actionable-notification__text-wrapper`}>
          <div className={`${prefix}--actionable-notification__content`}>
            {props.title && (
              <div className={`${prefix}--actionable-notification__title`}>
                {props.title}
              </div>
            )}
            {props.subtitle && (
              <div className={`${prefix}--actionable-notification__subtitle`}>
                {props.subtitle}
              </div>
            )}
            {props.children}
          </div>
        </div>
      </div>

      <NotificationActionButton
        onClick={props.onActionButtonClick}
        inline={props.inline}
      >
        {props.actionButtonLabel}
      </NotificationActionButton>

      {!props.hideCloseButton && (
        <NotificationButton
          aria-label={props["aria-label"]}
          notificationType="actionable"
          onClick={handleCloseButtonClick}
        />
      )}
    </div>
  );
}
