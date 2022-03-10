import { Component, JSX, splitProps } from "solid-js";
import { settings } from "carbon-components";

const { prefix } = settings;

export type BreadcrumbProps = {
  "aria-label"?: string;
  class?: string;
  noTrailingSlash?: boolean;
  ref?: HTMLElement;
} & JSX.HTMLAttributes<HTMLElement>;

export const Breadcrumb: Component<BreadcrumbProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLElement>;
  [props, rest] = splitProps(props, [
    "class",
    "children",
    "aria-label",
    "noTrailingSlash",
    "ref",
  ]);

  return (
    <nav
      classList={{
        [`${prefix}--breadcrumb--no-trailing-slash`]: props.noTrailingSlash,
      }}
      {...rest}
      //@ts-ignore
      ref={(e) => props.ref && props.ref(e)}
    >
      <ol
        class={`${prefix}--breadcrumb`}
        classList={{ [props.class!]: !!props.class }}
      >
        {props.children}
      </ol>
    </nav>
  );
};
