import type { JSX } from "solid-js";
export const Crop16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M25,20H23V9H12V7H23a2,2,0,0,1,2,2Z" /><path d="M9,23V2H7V7H2V9H7V23a2,2,0,0,0,2,2H23v5h2V25h5V23Z" /></svg>
