import type { JSX } from "solid-js";
export const LetterDd20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23 9v4H19a2 2 0 00-2 2v6a2 2 0 002 2h6V9zm-4 6h4v6H19zM11 23H7V9h4a4 4 0 014 4v6A4 4 0 0111 23zM9 21h2a2 2 0 002-2V13a2 2 0 00-2-2H9z" /></svg>