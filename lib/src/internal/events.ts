import { JSX } from "solid-js";
import { callEventHandlerUnion } from './callEventHandlerUnion';

export const composeEventHandlers = <E extends Event>(
  handlers: JSX.EventHandlerUnion<Element, E>[]
) =>
  (event: E & { currentTarget: Element; target: Element; }) => {
    for (let i = 0; i < handlers.length; i++) {
      if (event.defaultPrevented) {
        break;
      }
      if (typeof handlers[i] === 'function') {
        callEventHandlerUnion(handlers[i], event)
      }
    }
  };
  