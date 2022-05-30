import { Component, JSX, mergeProps, splitProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";
import { Link } from "./Link";

export type SwitcherItemProps = {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children: JSX.Element;
  class?: string;
  isSelected?: string;
  ref?: JSX.HTMLAttributes<HTMLAnchorElement>["ref"];
  tabIndex: string | number;
};

export const SwitcherItem: Component<SwitcherItemProps> = (props) => {
  const prefix = usePrefix();
  props = mergeProps({ tabIndex: 0 }, props);
  const [, rest] = splitProps(props, [
    "aria-label",
    "aria-labelledby",
    "children",
    "class",
    "isSelected",
    "ref",
    "tabIndex",
  ]);
  return (
    <li
      classList={{
        [`${prefix}--switcher__item`]: true,
        [props.class!]: !!props.class,
      }}
    >
      <Link
        {...rest}
        ref={props.ref}
        classList={{
          [`${prefix}--switcher__item-link`]: true,
          [`${prefix}--switcher__item-link--selected`]: !!props.isSelected,
        }}
        tabIndex={props.tabIndex}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
      >
        {props.children}
      </Link>
    </li>
  );
};
