import type { JSX } from "solid-js";
export const Temperature16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M13 17.26V6A4 4 0 005 6V17.26a7 7 0 108 0zM9 4a2 2 0 012 2v7H7V6A2 2 0 019 4zM9 28a5 5 0 01-2.5-9.33l.5-.28V15h4v3.39l.5.28A5 5 0 019 28zM20 4H30V6H20zM20 10H27V12H20zM20 16H30V18H20zM20 22H27V24H20z" /></svg>