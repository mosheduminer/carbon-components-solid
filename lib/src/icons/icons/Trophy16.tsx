import type { JSX } from "solid-js";
export const Trophy16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26,7H24V6a2.0023,2.0023,0,0,0-2-2H10A2.0023,2.0023,0,0,0,8,6V7H6A2.0023,2.0023,0,0,0,4,9v3a4.0045,4.0045,0,0,0,4,4h.322A8.1689,8.1689,0,0,0,15,21.9341V26H10v2H22V26H17V21.9311A7.9661,7.9661,0,0,0,23.74,16H24a4.0045,4.0045,0,0,0,4-4V9A2.0023,2.0023,0,0,0,26,7ZM8,14a2.0023,2.0023,0,0,1-2-2V9H8Zm14,0a6,6,0,0,1-6.1855,5.9971A6.1991,6.1991,0,0,1,10,13.7065V6H22Zm4-2a2.0023,2.0023,0,0,1-2,2V9h2Z" /></svg>
