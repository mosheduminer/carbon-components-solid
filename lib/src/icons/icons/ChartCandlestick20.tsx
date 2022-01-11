import type { JSX } from "solid-js";
export const ChartCandlestick20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26 10H24V6H22v4H20V22h2v4h2V22h2zM24 20H22V12h2zM14 8H12V4H10V8H8V18h2v4h2V18h2zm-2 8H10V10h2z" /><path d="M30,30H4a2,2,0,0,1-2-2V2H4V28H30Z" /></svg>
