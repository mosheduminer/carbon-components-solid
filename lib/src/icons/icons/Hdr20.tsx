import type { JSX } from "solid-js";
export const Hdr20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 15V11a2 2 0 00-2-2H22V23h2V17h1.48l2.34 6H30l-2.33-6H28A2 2 0 0030 15zm-6-4h4v4H24zM16 23H12V9h4a4 4 0 014 4v6A4 4 0 0116 23zm-2-2h2a2 2 0 002-2V13a2 2 0 00-2-2H14zM8 9L8 15 4 15 4 9 2 9 2 23 4 23 4 17 8 17 8 23 10 23 10 9 8 9z" /></svg>
