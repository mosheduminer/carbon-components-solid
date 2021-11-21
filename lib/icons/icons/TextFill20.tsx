import type { JSX } from "solid-js";
export const TextFill20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M4 26H28V30H4z" /><path d="M26,14.54a1,1,0,0,0-.25-.69L17.17,4.33A1.09,1.09,0,0,0,17,4.2V2H15V5L4.32,14.74a1,1,0,0,0-.06,1.41l8.57,9.52a1,1,0,0,0,.69.33h.05a1,1,0,0,0,.68-.26L24,16.8V21a1,1,0,0,0,2,0V14.57S26,14.55,26,14.54Zm-12.35,9-7.23-8L15,7.67V12h2V7.13l6.59,7.33Z" /></svg>
