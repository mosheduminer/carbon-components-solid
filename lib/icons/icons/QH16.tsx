import type { JSX } from "solid-js";
export const QH16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M18 9L18 15 14 15 14 9 12 9 12 23 14 23 14 17 18 17 18 23 20 23 20 9 18 9z" /></svg>