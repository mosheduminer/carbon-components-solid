import type { JSX } from "solid-js";
export const Radio20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,10H24V2H22v8H13V8H11v2H8V8H6v2H4a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V12A2,2,0,0,0,28,10ZM4,28V12H28V28Z" /><path d="M10 26a4 4 0 114-4A4 4 0 0110 26zm0-6a2 2 0 102 2A2 2 0 0010 20zM7 14H13V16H7zM17 16H26V18H17zM17 20H26V22H17zM17 24H26V26H17z" /></svg>
