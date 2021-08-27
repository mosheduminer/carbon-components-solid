import { JSX, Component, mergeProps } from "solid-js";

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
