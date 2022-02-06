import { Accessor, createContext } from "solid-js";

export const ExpandedContext = createContext<Accessor<boolean | undefined>>();
