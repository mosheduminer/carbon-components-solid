import type { JSX } from "solid-js";
export const SignalStrength24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26 6H28V26H26zM18 11H20V26H18zM11 16H13V26H11zM4 20H6V26H4z" /></svg>
