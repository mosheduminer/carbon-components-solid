import { JSX } from "solid-js";
import { callEventHandlerUnion } from './callEventHandlerUnion';

export const composeEventHandlers = <E extends Event, T extends Element>(
  handlers: (JSX.EventHandlerUnion<T, E> | undefined)[]
) =>
  (event: E & { currentTarget: T; target: Element; }) => {
    for (let i = 0; i < handlers.length; i++) {
      if (event.defaultPrevented) {
        break;
      }
      const handler = handlers[i];
      if (typeof handler === 'function' || Array.isArray(handler)) {
        callEventHandlerUnion(handler, event)
      }
    }
  };
  