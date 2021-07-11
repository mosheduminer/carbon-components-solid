import type { JSX } from "solid-js";

export const composeEventFunctions = <E extends Event, HE extends HTMLElement>(args: (JSX.EventHandlerUnion<HE, E> | undefined | null)[]) => {
  return (e: E) => args.forEach(func => {
    //@ts-ignore
    if (func && !e.defaultPrevented) func(e);
  });
}