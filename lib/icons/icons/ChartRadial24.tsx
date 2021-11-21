import type { JSX } from "solid-js";
export const ChartRadial24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16,30A14.0158,14.0158,0,0,1,2,16H4A12,12,0,1,0,16,4V2a14,14,0,0,1,0,28Z" /><path d="M16,26A10.0115,10.0115,0,0,1,6,16H8a8,8,0,1,0,8-8V6a10,10,0,0,1,0,20Z" /><path d="M16,22a6.0069,6.0069,0,0,1-6-6h2a4,4,0,1,0,4-4V10a6,6,0,0,1,0,12Z" /></svg>
