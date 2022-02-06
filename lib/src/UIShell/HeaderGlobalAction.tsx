import { settings } from "carbon-components";
import { Component, JSX, splitProps } from "solid-js";
import { Button } from "../Button";

const { prefix } = settings;

export type HeaderGlobalActionProps = {
  children: JSX.Element;
  class?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  onClick?: JSX.BoundEventHandler<HTMLButtonElement, MouseEvent>;
  isActive?: boolean;
  ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void) | undefined;
  tooltipAlignment?: "start" | "center" | "end";
} & JSX.HTMLAttributes<HTMLButtonElement>;

/**
 * HeaderGlobalAction is used as a part of the `HeaderGlobalBar`. It is
 * essentially an Icon Button with an additional state to indicate whether it is
 * "active". The active state comes from when a user clicks on the global action
 * which should trigger a panel to appear.
 *
 * Note: children passed to this component should be an Icon.
 */
export const HeaderGlobalAction: Component<HeaderGlobalActionProps> = (
  props
) => {
  let rest: JSX.HTMLAttributes<HTMLButtonElement>;
  [props, rest] = splitProps(props, [
    "aria-label",
    "aria-labelledby",
    "children",
    "class",
    "isActive",
    "onClick",
    "ref",
    "tooltipAlignment",
  ]);
  if (!props["aria-label"] && !props["aria-labelledby"]) {
    throw new Error("must specify either `aria-label` or `aria-labelledby`");
  }
  return (
    <Button
      {...rest}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      class={`${prefix}--header__action`}
      classList={{
        [props.class!]: !!props.class,
        [`${prefix}--header__action--active`]: props.isActive,
      }}
      //@ts-ignore
      onClick={props.onClick}
      type="button"
      hasIconOnly
      iconDescription={props["aria-label"]}
      tooltipPosition="bottom"
      tooltipAlignment={props.tooltipAlignment}
      //@ts-ignore
      ref={props.ref}
    >
      {props.children}
    </Button>
  );
};
