import { settings } from 'carbon-components';
import { createContext, useContext } from 'solid-js';

export const PrefixContext = createContext(settings.prefix);

export function usePrefix() {
  return useContext(PrefixContext);
}