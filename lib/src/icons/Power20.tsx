import type { JSX } from "solid-js";
export const Power20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M22.5,5.74l-1,1.73a11,11,0,1,1-11,0l-1-1.73a13,13,0,1,0,13,0Z" /><path d="M15 2H17V16H15z" /></svg>