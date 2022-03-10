import type { JSX, Component } from "solid-js";

export const TableHead: Component<
  Omit<JSX.HTMLAttributes<HTMLTableElement>, "classList">
> = (props) => {
  return (
    <thead classList={{ [props.class!]: !!props.class }}>
      {props.children}
    </thead>
  );
};
