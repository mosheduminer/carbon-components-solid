import { usePrefix } from "../internal/usePrefix";

export type SideNavDividerProps = {
  class?: string;
};

export function SideNavDivider(props: SideNavDividerProps) {
  const prefix = usePrefix();
  return (
    <li
      role="separator"
      class={`${prefix}--side-nav__divider`}
      classList={{
        [props.class!]: !!props.class,
      }}
    />
  );
}
