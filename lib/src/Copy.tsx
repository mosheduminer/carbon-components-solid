import { Component, splitProps, mergeProps, JSX, createSignal, onCleanup } from "solid-js";
import { composeEventFunctions } from "./internal/events";
import { settings } from "carbon-components";
import { debounce } from "lodash";

const { prefix } = settings;

export type CopyProps = {
  class?: string;
  feedback?: string;
  feedbackTimeout?: number;
  onAnimationEnd?: JSX.EventHandlerUnion<HTMLButtonElement, AnimationEvent>;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  disabled?: boolean;
} & JSX.HTMLAttributes<HTMLButtonElement>;

export const Copy: Component<CopyProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLButtonElement>;
  [props, rest] = splitProps(props, ["class", "feedback", "feedbackTimeout", "onAnimationEnd", "onClick", "disabled"]);
  props = mergeProps({ feedback: "Copied!", feedbackTimeout: 2000, onClick: () => { } }, props);

  const [animation, setAnimation] = createSignal('');

  const handleFadeOut = debounce(() => {
    setAnimation('fade-out');
  }, props.feedbackTimeout);

  const handleClick = () => {
    setAnimation('fade-in');
    handleFadeOut();
  };

  const handleAnimationEnd = (event: AnimationEvent) => {
    if (event.animationName === 'hide-feedback') {
      setAnimation('');
    }
  };

  onCleanup(() => handleFadeOut.cancel());

  return (
    <button
      disabled={props.disabled}
      type="button"
      class={`${prefix}--copy`}
      classList={{
        [`${prefix}--copy-btn--animating`]: !!animation,
        [`${prefix}--copy-btn--${animation}`]: !!animation,
      }}
      onClick={composeEventFunctions([props.onClick, handleClick])}
      onAnimationEnd={composeEventFunctions([
        props.onAnimationEnd,
        handleAnimationEnd,
      ])}
      {...rest}
      aria-live="polite"
      aria-label={
        (!props.children && (animation() ? props.feedback : rest['aria-label'])) || undefined
      }>
      {props.children}
      {animation() ? props.feedback : rest['aria-label']}
      <span
        aria-hidden="true"
        className={`${prefix}--assistive-text ${prefix}--copy-btn__feedback`}>
        {props.feedback}
      </span>
    </button>
  )
}