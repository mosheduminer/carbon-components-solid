import type { JSX } from "solid-js";
export const Http16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 11H25V21h2V18h3a2.0027 2.0027 0 002-2V13A2.0023 2.0023 0 0030 11zm-3 5V13h3l.001 3zM10 13L12 13 12 21 14 21 14 13 16 13 16 11 10 11 10 13zM23 11L17 11 17 13 19 13 19 21 21 21 21 13 23 13 23 11zM6 11L6 15 3 15 3 11 1 11 1 21 3 21 3 17 6 17 6 21 8 21 8 11 6 11z" /></svg>
