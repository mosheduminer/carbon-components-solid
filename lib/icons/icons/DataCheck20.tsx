import type { JSX } from "solid-js";
export const DataCheck20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23 27.18L20.41 24.59 19 26 23 30 30 23 28.59 21.59 23 27.18z" /><circle cx="11" cy="8" r="1" /><circle cx="11" cy="16" r="1" /><circle cx="11" cy="24" r="1" /><path d="M24,3H8A2,2,0,0,0,6,5V27a2,2,0,0,0,2,2h8V27H8V21H26V5A2,2,0,0,0,24,3Zm0,16H8V13H24Zm0-8H8V5H24Z" /></svg>
