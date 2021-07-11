import { Component, JSX, splitProps } from "solid-js";
import { settings } from "carbon-components";

const { prefix } = settings;

export type ButtonSetProps = {
  stacked?: boolean;
  class?: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const ButtonSet: Component<ButtonSetProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLDivElement>;
  [props, rest] = splitProps(props, ["stacked", "class", "ref"])
  return (
    <div classList={{
      [`${prefix}--btn-set--stacked`]: props.stacked, [props.class!]: !!props.class
    }} class={`${prefix}--btn-set`} {...rest} ref={props.ref}>
      {props.children}
    </div>
  );
}