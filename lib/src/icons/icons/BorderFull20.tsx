import type { JSX } from "solid-js";
export const BorderFull20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M8 10H18V12H8zM8 15H14V17H8z" /><path d="M29,29H3V3H29ZM5,27H27V5H5Z" /></svg>
