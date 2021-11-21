import type { JSX } from "solid-js";
export const Milestone24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M24.5857,6.5859A1.9865,1.9865,0,0,0,23.1714,6H16V2H14V6H6A2.0025,2.0025,0,0,0,4,8v6a2.0025,2.0025,0,0,0,2,2h8V30h2V16h7.1714a1.9865,1.9865,0,0,0,1.4143-.5859L29,11ZM23.1714,14H6V8H23.1716l3,3Z" /></svg>
