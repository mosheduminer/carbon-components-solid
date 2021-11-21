import type { JSX } from "solid-js";
export const Menu16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M2 12H14V13H2zM2 9H14V10H2zM2 6H14V7H2zM2 3H14V4H2z" /></svg>
