import { JSX, Component, mergeProps } from "solid-js";

export type ContentSwitchProps = {
  class?: string;
  disabled?: boolean;
  name: string;
  onClick?: ({
    index,
    name,
    text,
  }: {
    index: number;
    name: string;
    text: string;
  }) => void;
  onKeyDown?: ({
    index,
    name,
    text,
  }: {
    index: number;
    name: string;
    text: string;
    key: string | number;
  }) => void;
  selected?: boolean;
  text: string;
  ref?: (HTMLButtonElement | undefined) | ((b: HTMLButtonElement) => any);
};

export const ContentSwitch: Component<ContentSwitchProps> = (props) => {
  props = mergeProps(
    { selected: false, onClick: () => {}, onKeyDown: () => {} },
    props
  );
  return props as unknown as JSX.Element;
};
