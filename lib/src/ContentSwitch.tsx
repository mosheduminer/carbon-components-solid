import { JSX, Component, splitProps, mergeProps } from "solid-js";
import { settings } from "carbon-components";

const { prefix } = settings;

export type ContentSwitchProps = {
  class?: string;
  disabled?: boolean;
  name: string;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  onKeyDown?: JSX.EventHandlerUnion<HTMLButtonElement, KeyboardEvent>;
  selected?: boolean;
  text: string;
  ref?: (HTMLButtonElement | undefined) | ((b: HTMLButtonElement) => any);
};

export const ContentSwitch: Component<ContentSwitchProps> = (props) => {
  props = mergeProps(
    { selected: false, onClick: () => { }, onKeyDown: () => { } },
    props
  );
  return props as unknown as JSX.Element;
};
