import type { JSX } from "solid-js";
export const ArrowDownRight16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M10 26L10 24 22.59 24 6 7.41 7.41 6 24 22.59 24 10 26 10 26 26 10 26z" /></svg>
