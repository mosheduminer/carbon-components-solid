import type { JSX } from "solid-js";
export const NewTab24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26,26H6V6H16V4H6A2.002,2.002,0,0,0,4,6V26a2.002,2.002,0,0,0,2,2H26a2.002,2.002,0,0,0,2-2V16H26Z" /><path d="M26,26H6V6H16V4H6A2.002,2.002,0,0,0,4,6V26a2.002,2.002,0,0,0,2,2H26a2.002,2.002,0,0,0,2-2V16H26Z" /><path d="M26 6L26 2 24 2 24 6 20 6 20 8 24 8 24 12 26 12 26 8 30 8 30 6 26 6z" /></svg>
