import type { JSX } from "solid-js";
export const Upload16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M3 9L3.7 9.7 7.5 5.9 7.5 15 8.5 15 8.5 5.9 12.3 9.7 13 9 8 4zM3 4V2h10v2h1V2c0-.6-.4-1-1-1H3C2.4 1 2 1.4 2 2v2H3z" /></svg>