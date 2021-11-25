import type { JSX } from "solid-js";
export const SearchLocate16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 28.5859l-4.6885-4.6884a8.028 8.028 0 10-1.414 1.414L28.5859 30zM19 25a6 6 0 116-6A6.0066 6.0066 0 0119 25zM2 12H10V14H2zM2 2H18V4H2zM2 7H18V9H2z" /></svg>