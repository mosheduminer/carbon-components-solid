import type { JSX } from "solid-js";
export const ChevronUpGlyph = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="currentColor" width="10" height="6"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M5 0L10 5 9.3 5.7 5 1.4 0.7 5.7 0 5z" /></svg>