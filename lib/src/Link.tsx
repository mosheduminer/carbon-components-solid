import { Component, JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { usePrefix } from "./internal/usePrefix";

export type LinkProps = {
  class?: string;
  disabled?: boolean;
  href?: string;
  inline?: boolean;
  renderIcon?: Component;
  size?: "sm" | "md" | "lg";
  visited?: boolean;
} & JSX.HTMLAttributes<HTMLParagraphElement> &
  JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: Component<LinkProps> = (props) => {
  const prefix = usePrefix();
  const [, rest] = splitProps(props, [
    "class",
    "children",
    "disabled",
    "href",
    "inline",
    "renderIcon",
    "size",
    "visited",
  ]);

  return (
    <Dynamic
      component={props.disabled ? "p" : "a"}
      href={props.disabled ? undefined : props.href}
      classList={{
        [`${prefix}--link`]: true,
        [props.class!]: !!props.class,
        [`${prefix}--link--disabled`]: props.disabled,
        [`${prefix}--link--inline`]: props.inline,
        [`${prefix}--link--visited`]: props.visited,
        [`${prefix}--link--${props.size}`]: props.size,
      }}
      rel={
        (rest as JSX.AnchorHTMLAttributes<HTMLAnchorElement>).target ===
        "_blank"
          ? "noopener"
          : null
      }
      {...rest}
    >
      {props.children}
      {!props.inline && props.renderIcon && (
        <div class={`${prefix}--link__icon`}>
          <Dynamic component={props.renderIcon} />
        </div>
      )}
    </Dynamic>
  );
};
