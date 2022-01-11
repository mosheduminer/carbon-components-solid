import type { JSX } from "solid-js";
export const UserFilled16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M6 30H26V25a7.0082 7.0082 0 00-7-7H13a7.0082 7.0082 0 00-7 7zM9 9a7 7 0 107-7A7 7 0 009 9z" /></svg>
