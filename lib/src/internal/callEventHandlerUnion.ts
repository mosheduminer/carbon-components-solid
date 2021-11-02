import { JSX } from "solid-js";

export function callEventHandlerUnion<T, E extends Event>(
	eventHandlerUnion: JSX.EventHandlerUnion<T, E>,
	event: E & {
		currentTarget: T;
		target: Element;
	}
) {
	if (typeof eventHandlerUnion === 'function') {
		eventHandlerUnion(event);
	} else if (Array.isArray(eventHandlerUnion)) {
		eventHandlerUnion[0](eventHandlerUnion[1], event);
	}
}