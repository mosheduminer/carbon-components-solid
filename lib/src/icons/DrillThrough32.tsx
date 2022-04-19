import type { JSX } from "solid-js";
export const DrillThrough32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16,30A14.0158,14.0158,0,0,1,2,16H4A12,12,0,1,0,16,4V2a14,14,0,0,1,0,28Z" /><path d="M4 12L4 10 8.586 10 2 3.414 3.414 2 10 8.586 10 4 12 4 12 12 4 12zM16 10v6H10a6 6 0 106-6z" /></svg>