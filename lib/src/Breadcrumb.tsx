import { Component, JSX, splitProps } from "solid-js";
import { settings } from "carbon-components";

const { prefix } = settings;

export type BreadcrumbProps = {
  'aria-label'?: string;
  class?: string;
  noTrailingSlash?: boolean;
  ref?: HTMLElement;
} & JSX.HTMLAttributes<HTMLElement>;

export const Breadcrumb: Component<BreadcrumbProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLElement>;
  [props, rest] = splitProps(props, ["class", "children", "aria-label", "noTrailingSlash", "ref"]);

  return (
    <nav
      class={`${prefix}--breadcrumb`}
      classList={{ [`${prefix}--breadcrumb--no-trailing-slash`]: props.noTrailingSlash }}
      {...rest}
      ref={props.ref}>
      <ol classList={{[props.class!]: !!props.class}}>{props.children}</ol>
    </nav>
  )
}
