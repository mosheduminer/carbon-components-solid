import { Component, JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { usePrefix } from "./internal/usePrefix";

export type LinkProps = {
  class?: string;
  disabled?: boolean;
  href: string;
  inline?: boolean;
  renderIcon?: Component;
  size?: "sm" | "md" | "lg";
  visited?: boolean;
} & JSX.HTMLAttributes<HTMLParagraphElement> & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: Component<LinkProps> = (props) => {
  const prefix = usePrefix();
  let rest: JSX.HTMLAttributes<HTMLParagraphElement> | JSX.AnchorHTMLAttributes<HTMLAnchorElement>;
  [props, rest] = splitProps(props, ["class", "children", "disabled", "href", "inline", "renderIcon", "size", "visited"]);

  return (
    <Dynamic
      component={props.disabled ? 'p' : 'a'}
      href={props.disabled ? undefined : props.href}
      class={`${prefix}--link`}
      classList={{
        [props.class!]: !!props.class,
        [`${prefix}--link--disabled`]: props.disabled,
        [`${prefix}--link--inline`]: props.inline,
        [`${prefix}--link--visited`]: props.visited,
        [`${prefix}--link--${props.size}`]: props.size,
      }}
      rel={(rest as JSX.AnchorHTMLAttributes<HTMLAnchorElement>).target === '_blank' ? 'noopener' : null}
      {...rest}>
      {props.children}
      {!props.inline && props.renderIcon && (
        <div className={`${prefix}--link__icon`}>
          <props.renderIcon />
        </div>
      )}
    </Dynamic>
  );
}