import type { JSX } from "solid-js";
export const QTAlt20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M8 11L11 11 11 23 13 23 13 11 16 11 16 9 8 9 8 11zM24 9L22 9 22 7 20 7 20 9 18 9 18 11 20 11 20 17 21 18 22 17 22 11 24 11 24 9z" /></svg>