import type { JSX } from "solid-js";
export const Scan24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M21,29H5a2,2,0,0,1-2-2V5A2,2,0,0,1,5,3H21V5H5V27H21Z" /><path d="M15 9H17V23H15zM27 9H29V23H27zM21 9H23V23H21z" /></svg>
