import type { JSX } from "solid-js";
export const XAxis24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23,20l-1.4141,1.4141L24.1719,24H6V4H4V24a2.0023,2.0023,0,0,0,2,2H24.1719l-2.586,2.5859L23,30l5-5Z" /></svg>
