import {
  children,
  Component,
  createMemo,
  JSX,
  Show,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { Close16 } from "./icons/Close16";
import { callEventHandlerUnion } from "./internal/callEventHandlerUnion";
import { createId } from "./internal/id";
import { usePrefix } from "./internal/usePrefix";

const TYPES = {
  red: "Red",
  magenta: "Magenta",
  purple: "Purple",
  blue: "Blue",
  cyan: "Cyan",
  teal: "Teal",
  green: "Green",
  gray: "Gray",
  "cool-gray": "Cool-Gray",
  "warm-gray": "Warm-Gray",
  "high-contrast": "High-Contrast",
  outline: "Outline",
};

export const types = Object.keys(TYPES);

export type TagProps = {
  class?: string;
  disabled?: boolean;
  filter?: boolean;
  id?: string;
  type: keyof typeof TYPES;
  renderIcon?: Component;
  title?: string;
  onClose?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  size?: "sm" | "md";
} & Omit<JSX.HTMLAttributes<HTMLDivElement | HTMLButtonElement>, "onClick">;

export const Tag: Component<TagProps> = (props) => {
  const [, rest] = splitProps(props, [
    "children",
    "class",
    "disabled",
    "filter",
    "id",
    "onClick",
    "onClose",
    "renderIcon",
    "size",
    "title",
    "type",
  ]);
  const prefix = usePrefix();
  const tagId = createMemo(() => props.id || `tag-${createId()}`);
  const tagClasses = () => ({
    [props.class!]: !!props.class,
    [`${prefix}--tag`]: true,
    [`${prefix}--tag--disabled`]: props.disabled,
    [`${prefix}--tag--filter`]: props.filter,
    [`${prefix}--tag--${props.size}`]: !!props.size,
    [`${prefix}--tag--${props.type}`]: !!props.type,
    [`${prefix}--tag--interactive`]: props.onClick && !props.filter,
  });
  const handleClose: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event
  ) => {
    if (props.onClose) {
      event.stopPropagation();
      callEventHandlerUnion(props.onClose, event);
    }
  };

  const childrenNodes = children(() => props.children);

  return (
    <Show
      when={props.filter}
      fallback={
        <Dynamic
          component={props.onClick ? "button" : "div"}
          disabled={props.onClick ? props.disabled : undefined}
          classList={tagClasses()}
          id={tagId()}
          {...rest}
        >
          <Show when={props.renderIcon}>
            {(Icon) => (
              <div class={`${prefix}--tag__custom-icon`}>
                <Icon />
              </div>
            )}
          </Show>
          <span
            //@ts-ignore
            title={
              typeof childrenNodes() === "string" ? childrenNodes() : undefined
            }
          >
            {childrenNodes() !== null && props.children !== undefined
              ? childrenNodes()
              : TYPES[props.type]}
          </span>
        </Dynamic>
      }
    >
      {/**
      //@ts-ignore (ref property in {...rest})*/}
      <div
        classList={tagClasses()}
        aria-label={
          props.title !== undefined
            ? `${props.title} ${childrenNodes()}`
            : `Clear filter ${childrenNodes()}`
        }
        id={tagId()}
        {...rest}
      >
        <span
          class={`${prefix}--tag__label`}
          //@ts-ignore
          title={
            typeof childrenNodes() === "string" ? childrenNodes : undefined
          }
        >
          {childrenNodes() !== null && childrenNodes() !== undefined
            ? childrenNodes()
            : TYPES[props.type]}
        </span>
        <button
          type="button"
          class={`${prefix}--tag__close-icon`}
          onClick={handleClose}
          disabled={props.disabled}
          aria-labelledby={tagId()}
          title={props.title}
        >
          <Close16 />
        </button>
      </div>
    </Show>
  );
};
