import {
  Component,
  createSignal,
  splitProps,
  JSX,
  mergeProps,
  createEffect,
} from "solid-js";
import { settings } from "carbon-components";
import { ChevronRight } from "./icons/16";
import { match } from "./internal/keyboard/match";
import keys from "./internal/keyboard/keys";

const { prefix } = settings;

export type AccordionItemProps = {
  handleAnimationEnd?: JSX.EventHandler<HTMLLIElement, AnimationEvent>;
  class?: string;
  disabled?: boolean;
  onHeadingClick?: (props: { event: MouseEvent; isOpen: boolean }) => any;
  open?: boolean;
  title?: JSX.Element;
} & JSX.HTMLAttributes<HTMLLIElement>;

export const AccordionItem: Component<AccordionItemProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLLIElement>;
  [props, rest] = splitProps(props, [
    "class",
    "children",
    "disabled",
    "onHeadingClick",
    "open",
    "title",
    "handleAnimationEnd",
  ]);
  props = mergeProps({ open: false }, props);
  const [isOpen, setIsOpen] = createSignal(props.open);
  const [prevIsOpen, setPrevIsOpen] = createSignal(props.open);
  const [animation, setAnimation] = createSignal("");

  createEffect(() => {
    if (props.open !== prevIsOpen()) {
      setAnimation(isOpen() ? "collapsing" : "expanding");
      setIsOpen(props.open);
      setPrevIsOpen(props.open);
    }
  });

  function onClick(event: MouseEvent) {
    const nextValue = !isOpen();
    setAnimation(isOpen() ? "collapsing" : "expanding");
    setIsOpen(nextValue);
    if (props.onHeadingClick) {
      props.onHeadingClick({ isOpen: nextValue, event });
    }
  }

  // If the AccordionItem is open, and the user hits the ESC key, then close it
  function onKeyDown(event: KeyboardEvent) {
    if (isOpen() && match(event, keys.Escape)) {
      setIsOpen(false);
    }
  }

  function handleAnimationEnd(
    event: AnimationEvent & {
      currentTarget: HTMLLIElement;
      target: Element;
    }
  ) {
    if (props.handleAnimationEnd) {
      props.handleAnimationEnd(event);
    }
    setAnimation("");
  }

  return (
    <li
      class={`${prefix}--accordion__item`}
      classList={{
        [`${prefix}--accordion__item--active`]: isOpen(),
        [`${prefix}--accordion__item--${animation()}`]: !!animation(),
        [`${prefix}--accordion__item--disabled`]: props.disabled,
        [props.class!]: !!props.class,
      }}
      {...rest}
      onAnimationEnd={handleAnimationEnd}
    >
      <button
        disabled={props.disabled}
        aria-expanded={isOpen()}
        class={`${prefix}--accordion__heading`}
        onClick={(e) => onClick(e)}
        onKeyDown={onKeyDown}
        type="button"
      >
        <ChevronRight class={`${prefix}--accordion__arrow`} />
        <div class={`${prefix}--accordion__title`}>{props.title}</div>
      </button>
      <div class={`${prefix}--accordion__content`}>{props.children}</div>
    </li>
  );
};
