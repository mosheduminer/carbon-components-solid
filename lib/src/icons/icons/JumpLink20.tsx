import type { JSX } from "solid-js";
export const JumpLink20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M13.4141,17.5859,18,22.1719V8H8V6H18a2.0024,2.0024,0,0,1,2,2V22.1719l4.5859-4.586L26,19l-7,7-7-7Z" /></svg>
