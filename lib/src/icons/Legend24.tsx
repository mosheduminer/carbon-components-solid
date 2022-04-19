import type { JSX } from "solid-js";
export const Legend24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16 22H30V24H16z" /><rect width="6" height="6" x="4" y="20" rx="1" /><path d="M16 8H30V10H16zM9.5 12h-5a.5.5 0 01-.4473-.7236l2.5-5.0224a.5206.5206 0 01.8945 0l2.5 5.0225A.5.5 0 019.5 12z" /></svg>