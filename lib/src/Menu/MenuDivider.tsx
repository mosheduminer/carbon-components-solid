import { usePrefix } from "../internal/usePrefix";

export function MenuDivider() {
  const prefix = usePrefix();
  return <li role="separator" class={`${prefix}--menu-divider`} />;
}
