import type { JSX } from "solid-js";
export const LogoXing16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M11.42,8.29a1.25,1.25,0,0,0-1.13-.76h-4a.65.65,0,0,0-.55.25.63.63,0,0,0,0,.62l2.73,4.73v0L4.17,20.72a.6.6,0,0,0,0,.62.58.58,0,0,0,.52.28h4a1.22,1.22,0,0,0,1.1-.78l4.36-7.71S11.42,8.29,11.42,8.29Z" /><path d="M27.83,2.88a.65.65,0,0,0,0-.62A.61.61,0,0,0,27.3,2H23.22a1.19,1.19,0,0,0-1.08.77s-8.7,15.43-9,15.93l5.74,10.53A1.26,1.26,0,0,0,20,30h4a.59.59,0,0,0,.54-.26.62.62,0,0,0,0-.62l-5.69-10.4a0,0,0,0,1,0,0Z" /></svg>