import { Component } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export type SideNavDetailsProps = {
  class?: string;
  title: string;
};

export const SideNavDetails: Component<SideNavDetailsProps> = (props) => {
  const prefix = usePrefix();
  return (
    <div
      class={`${prefix}--side-nav__details`}
      classList={{ [props.class!]: !!props.class }}
    >
      <h2 class={`${prefix}--side-nav__title`} title={props.title}>
        {props.title}
      </h2>
      {props.children}
    </div>
  );
};
