import type { JSX } from "solid-js";
export const Windy20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M21 15H8V13H21a3 3 0 10-3-3H16a5 5 0 115 5zM23 28a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H4V18H23a5 5 0 010 10z" /></svg>
