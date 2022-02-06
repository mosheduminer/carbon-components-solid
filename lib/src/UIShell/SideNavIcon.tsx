import { usePrefix } from "../internal/usePrefix";
import { JSX, mergeProps } from "solid-js";

export type SideNavIconProps = {
  children: JSX.Element;
  class?: string;
  small?: boolean;
};

export const SideNavIcon = (props: SideNavIconProps) => {
  const prefix = usePrefix();
  props = mergeProps(
    {
      small: true,
    },
    props
  );
  return (
    <div
      classList={{
        [`${prefix}--side-nav__icon`]: true,
        [`${prefix}--side-nav__icon--small`]: props.small,
        [props.class!]: !!props.class,
      }}
    >
      {props.children}
    </div>
  );
};
