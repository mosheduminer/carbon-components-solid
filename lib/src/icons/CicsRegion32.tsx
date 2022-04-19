import type { JSX } from "solid-js";
export const CicsRegion32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23.5 18L21 18.7 21 16 19 16 19 18.7 16.5 18 16 19.9 18.4 20.6 17 23 18.7 24 20 21.8 21.3 24 23 23 21.6 20.6 24 19.9 23.5 18zM16 13L16 11 13 11 13 8 11 8 11 11 8 11 8 13 11 13 11 16 13 16 13 13 16 13z" /><path d="M26,4H6A2.0059,2.0059,0,0,0,4,6V26a2.0059,2.0059,0,0,0,2,2H26a2.0059,2.0059,0,0,0,2-2V6A2.0059,2.0059,0,0,0,26,4ZM6,26V6H26V26Z" /></svg>
