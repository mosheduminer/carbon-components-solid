import type { JSX } from "solid-js";
export const TextSuperscript32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M29 17L23 17 23 11 27 11 27 9 23 9 23 7 29 7 29 13 25 13 25 15 29 15 29 17zM4 7L4 9 11 9 11 25 13 25 13 9 20 9 20 7 4 7z" /></svg>