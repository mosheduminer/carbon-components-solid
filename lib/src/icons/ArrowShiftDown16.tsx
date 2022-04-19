import type { JSX } from "solid-js";
export const ArrowShiftDown16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23,6V16h5a1,1,0,0,1,.707,1.707l-12,12a.9994.9994,0,0,1-1.414,0l-12-12A1,1,0,0,1,4,16H9V6a2.0023,2.0023,0,0,1,2-2H21A2.0027,2.0027,0,0,1,23,6ZM16,27.5859,25.5859,18H21V6H11V18H6.4141Z" /></svg>