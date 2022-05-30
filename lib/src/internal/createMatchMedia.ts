import { createEffect, createSignal, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";

export function createMatchMedia(mediaQueryString: string) {
  const [matches, setMatches] = createSignal(
    (() => {
      if (!isServer) {
        const mediaQueryList = window.matchMedia(mediaQueryString);
        return mediaQueryList.matches;
      }
      return false;
    })()
  );

  createEffect(() => {
    function listener(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    const mediaQueryList = window.matchMedia(mediaQueryString);
    // Support fallback to `addListener` for broader browser support
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    // Make sure the media query list is in sync with the matches state
    setMatches(mediaQueryList.matches);

    onCleanup(() => {
      //@ts-ignore
      if (mediaQueryList.addEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    });
  });
  return matches;
}
