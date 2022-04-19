import { createContext, useContext } from "solid-js";

export const PrefixContext = createContext("cds");

export function usePrefix() {
  return useContext(PrefixContext);
}
