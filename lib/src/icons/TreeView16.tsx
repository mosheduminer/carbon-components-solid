import type { JSX } from "solid-js";
export const TreeView16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30,20V12H22v3H17V7a2,2,0,0,0-2-2H10V2H2v8h8V7h5V25a2,2,0,0,0,2,2h5v3h8V22H22v3H17V17h5v3ZM8,8H4V4H8ZM24,24h4v4H24Zm0-10h4v4H24Z" /></svg>