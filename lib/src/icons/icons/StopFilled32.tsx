import type { JSX } from "solid-js";
export const StopFilled32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm6,18a2,2,0,0,1-2,2H12a2,2,0,0,1-2-2V12a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2Z" /></svg>
