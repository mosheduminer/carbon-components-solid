import type { JSX } from "solid-js";
export const Tif24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 11L30 9 22 9 22 23 24 23 24 17 29 17 29 15 24 15 24 11 30 11zM12 11L15 11 15 21 12 21 12 23 20 23 20 21 17 21 17 11 20 11 20 9 12 9 12 11zM2 11L5 11 5 23 7 23 7 11 10 11 10 9 2 9 2 11z" /></svg>