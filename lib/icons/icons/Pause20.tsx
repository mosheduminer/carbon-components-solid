import type { JSX } from "solid-js";
export const Pause20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M12 8V24H8V8h4m0-2H8A2 2 0 006 8V24a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2zM24 8V24H20V8h4m0-2H20a2 2 0 00-2 2V24a2 2 0 002 2h4a2 2 0 002-2V8a2 2 0 00-2-2z" /></svg>