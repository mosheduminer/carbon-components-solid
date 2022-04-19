import type { JSX } from "solid-js";
export const Tornado20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16 26H20V28H16zM12 22H18V24H12zM8 18H18V20H8zM8 14H20V16H8zM10 10H24V12H10zM8 6H26V8H8z" /></svg>