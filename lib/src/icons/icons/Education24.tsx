import type { JSX } from "solid-js";
export const Education24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26 30H24V27a5.0059 5.0059 0 00-5-5H13a5.0059 5.0059 0 00-5 5v3H6V27a7.0082 7.0082 0 017-7h6a7.0082 7.0082 0 017 7zM5 6A1 1 0 004 7v9H6V7A1 1 0 005 6z" /><path d="M4,2V4H9v7a7,7,0,0,0,14,0V4h5V2Zm7,2H21V7H11Zm5,12a5,5,0,0,1-5-5V9H21v2A5,5,0,0,1,16,16Z" /></svg>
