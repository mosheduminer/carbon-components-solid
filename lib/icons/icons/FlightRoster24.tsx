import type { JSX } from "solid-js";
export const FlightRoster24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path fill-rule="evenodd" d="M26,6a2,2,0,0,0-2-2H8A2,2,0,0,0,6,6V26a2,2,0,0,0,2,2h8V26H8V6H24v6h2Z" /><path d="M10 18H16V20H10zM10 14H22V16H10z" /><path fill-rule="evenodd" d="M22 10v2H10V10zM25 23l5 2V23l-5-2.5V18a1 1 0 00-2 0v2.5L18 23v2l5-2v3.5L21 28v1l3-1 3 1V28l-2-1.5z" /></svg>
