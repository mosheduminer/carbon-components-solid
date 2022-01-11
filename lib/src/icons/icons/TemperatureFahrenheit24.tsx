import type { JSX } from "solid-js";
export const TemperatureFahrenheit24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 6L30 4 22 4 22 18 24 18 24 12 29 12 29 10 24 10 24 6 30 6z" /><circle cx="18" cy="4" r="2" /><path d="M10,20.1841V12H8v8.1841a3,3,0,1,0,2,0Z" /><path d="M9,30A6.9931,6.9931,0,0,1,4,18.1108V7A5,5,0,0,1,14,7V18.1108A6.9931,6.9931,0,0,1,9,30ZM9,4A3.0033,3.0033,0,0,0,6,7V18.9834l-.332.2983a5,5,0,1,0,6.664,0L12,18.9834V7A3.0033,3.0033,0,0,0,9,4Z" /></svg>
