import type { JSX } from "solid-js";
export const Blockchain32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M6,24H4V8H6ZM28,8H26V24h2ZM24,6V4H8V6Zm0,22V26H8v2Z" /></svg>
