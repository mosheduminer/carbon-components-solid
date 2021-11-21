import type { JSX } from "solid-js";
export const TextFootnote20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M2 7L2 9 9 9 9 25 11 25 11 9 18 9 18 7 2 7zM30 11.076L29.256 9.219 26 10.522 26 7 24 7 24 10.523 20.744 9.22 20 11.077 23.417 12.444 20.9 15.8 22.5 17 25 13.667 27.5 17 29.1 15.8 26.583 12.443 30 11.076z" /></svg>
