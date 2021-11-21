import type { JSX } from "solid-js";
export const ObservedHail24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M4,18A12,12,0,1,0,16,6H12V1L6,7l6,6V8h4A10,10,0,1,1,6,18Z" /><circle cx="13.5" cy="23.5" r="1.5" /><circle cx="10.5" cy="19.5" r="1.5" /><circle cx="16.5" cy="19.5" r="1.5" /><path d="M11.964 14.5H17.036V16.499H11.964z" transform="rotate(-45 14.5 15.5)" /><path d="M17.964 14.5H23.035999999999998V16.499H17.964z" transform="rotate(-45 20.5 15.5)" /></svg>
