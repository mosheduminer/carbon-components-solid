import type { JSX } from "solid-js";
export const Exit16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26 4H28V28H26zM11.414 20.586L7.828 17 22 17 22 15 7.828 15 11.414 11.414 10 10 4 16 10 22 11.414 20.586z" /></svg>
