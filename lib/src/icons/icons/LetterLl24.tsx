import type { JSX } from "solid-js";
export const LetterLl24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M11 21L11 9 9 9 9 23 17 23 17 21 11 21zM23 23H21a2 2 0 01-2-2V9h2V21h2z" /></svg>
