import { Component, splitProps, mergeProps, JSX } from "solid-js";
import { Copy } from "./Copy";
import { Copy16 } from "../icons/icons/Copy16";
import settings from "carbon-components/es/globals/js/settings";

const { prefix } = settings;

export type CopyButtonProps = {
  class?: string;
  feedback?: string;
  feedbackTimeout?: number;
  iconDescription?: string;
  disabled?: boolean;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
} & JSX.HTMLAttributes<HTMLButtonElement>;

export const CopyButton: Component<CopyButtonProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLButtonElement>;
  [props, rest] = splitProps(props, [
    "class",
    "feedback",
    "feedbackTimeout",
    "iconDescription",
    "disabled",
    "onClick",
  ]);
  props = mergeProps(
    {
      iconDescription: "Copy to clipboard",
      feedback: "Copied!",
      feedbackTimeout: 2000,
      onClick: () => {},
    },
    props
  );
  return (
    <Copy
      class={`class ${prefix}--copy-btn`}
      onClick={props.onClick}
      disabled={props.disabled}
      feedbackTimeout={props.feedbackTimeout}
      feedback={props.feedback}
      aria-label={props.iconDescription}
      title={props.iconDescription}
      {...rest}
    >
      <Copy16 class={`${prefix}--snippet__icon`} />
    </Copy>
  );
};
