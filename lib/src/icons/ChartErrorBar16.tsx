import type { JSX } from "solid-js";
export const ChartErrorBar16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M22,28V12H18V8h2V6H14V8h2v4H12V28H4V2H2V28a2,2,0,0,0,2,2H30V28ZM14,14h2v4H14Zm6,14H14V20h6Zm0-10H18V14h2Z" /></svg>