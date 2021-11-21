import type { JSX } from "solid-js";
export const Websheet32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="24" cy="24" r="2" /><path d="M24,30a6,6,0,1,1,6-6A6.0069,6.0069,0,0,1,24,30Zm0-10a4,4,0,1,0,4,4A4.0045,4.0045,0,0,0,24,20Z" /><path d="M16,28H8V4h8v6a2.0058,2.0058,0,0,0,2,2h6v3h2V10a.9092.9092,0,0,0-.3-.7l-7-7A.9087.9087,0,0,0,18,2H8A2.0058,2.0058,0,0,0,6,4V28a2.0058,2.0058,0,0,0,2,2h8ZM18,4.4,23.6,10H18Z" /></svg>
