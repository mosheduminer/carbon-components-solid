import type { JSX } from "solid-js";
export const Compass24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16,4A12,12,0,1,1,4,16,12,12,0,0,1,16,4m0-2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z" /><path d="M23,10.41,21.59,9l-4.3,4.3a3,3,0,0,0-4,4L9,21.59,10.41,23l4.3-4.3a3,3,0,0,0,4-4ZM17,16a1,1,0,1,1-1-1A1,1,0,0,1,17,16Z" /><circle cx="16" cy="7.5" r="1.5" /></svg>
