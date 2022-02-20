import { settings } from 'carbon-components';

const { prefix } = settings;

export function MenuDivider() {
  return <li role="separator" className={`${prefix}--menu-divider`} />;
}
