import type { JSX } from "solid-js";
export const NavaidVordme24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="16" cy="16" r="2" /><path d="M30,6a2.0023,2.0023,0,0,0-2-2H4A2.0023,2.0023,0,0,0,2,6V26a2.0023,2.0023,0,0,0,2,2H28a2.0023,2.0023,0,0,0,2-2Zm-2,6.9258L22.9636,6H28ZM27.7637,16,20.491,26H11.509L4.2363,16,11.509,6h8.982ZM9.0364,6,4,12.9248V6ZM4,19.0752,9.0364,26H4ZM22.9636,26l5.0374-6.9263L28,26Z" /></svg>
