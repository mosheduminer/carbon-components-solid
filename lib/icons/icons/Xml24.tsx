import type { JSX } from "solid-js";
export const Xml24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M24 21L24 9 22 9 22 23 30 23 30 21 24 21zM18 9L16.48 14 16 15.98 15.54 14 14 9 12 9 12 23 14 23 14 15 13.84 13 14.42 15 16 19.63 17.58 15 18.16 13 18 15 18 23 20 23 20 9 18 9zM10 9L8 9 6 15 4 9 2 9 4.75 16 2 23 4 23 6 17 8 23 10 23 7.25 16 10 9z" /></svg>
