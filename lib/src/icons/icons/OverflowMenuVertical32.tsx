import type { JSX } from "solid-js";
export const OverflowMenuVertical32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="16" cy="8" r="2" /><circle cx="16" cy="16" r="2" /><circle cx="16" cy="24" r="2" /></svg>
