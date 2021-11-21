import type { JSX } from "solid-js";
export const Contrast24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M29.37,11.84a13.6,13.6,0,0,0-1.06-2.51A14.17,14.17,0,0,0,25.9,6.1a14,14,0,1,0,0,19.8,14.17,14.17,0,0,0,2.41-3.23,13.6,13.6,0,0,0,1.06-2.51,14,14,0,0,0,0-8.32ZM4,16A12,12,0,0,1,16,4V28A12,12,0,0,1,4,16Z" /></svg>
