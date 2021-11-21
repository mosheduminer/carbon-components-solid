import type { JSX } from "solid-js";
export const ApplicationWeb16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26 2H30V6H26zM26 8H30V12H26zM20 2H24V6H20zM20 8H24V12H20z" /><path d="M28,16v6H4V6H16V4H4A2,2,0,0,0,2,6V22a2,2,0,0,0,2,2h8v4H8v2H24V28H20V24h8a2,2,0,0,0,2-2V16ZM18,28H14V24h4Z" /></svg>
