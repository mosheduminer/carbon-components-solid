import type { JSX } from "solid-js";
export const Version32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16,2V4H26V19h2V4a2.0023,2.0023,0,0,0-2-2Z" /><path d="M11,7V9H21V24h2V9a2.0023,2.0023,0,0,0-2-2Z" /><path d="M6,12H16a2.0023,2.0023,0,0,1,2,2V28a2.0023,2.0023,0,0,1-2,2H6a2.0023,2.0023,0,0,1-2-2V14A2.0023,2.0023,0,0,1,6,12Zm10,2L6,13.9988V28H16Z" /></svg>
