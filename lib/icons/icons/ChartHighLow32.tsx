import type { JSX } from "solid-js";
export const ChartHighLow32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M15 8L12 8 12 6 10 6 10 20 7 20 7 22 10 22 10 24 12 24 12 10 15 10 15 8zM27 10L24 10 24 6 22 6 22 18 19 18 19 20 22 20 22 24 24 24 24 12 27 12 27 10z" /><path d="M30,30H4a2,2,0,0,1-2-2V2H4V28H30Z" /></svg>
