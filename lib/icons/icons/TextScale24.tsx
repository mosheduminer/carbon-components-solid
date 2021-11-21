import type { JSX } from "solid-js";
export const TextScale24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 5L30 8 22 8 22 26 19 26 19 8 11 8 11 5 30 5z" /><path d="M7 26L7 14 2 14 2 12 14 12 14 14 9 14 9 26 7 26z" /></svg>
