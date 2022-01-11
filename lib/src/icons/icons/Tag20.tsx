import type { JSX } from "solid-js";
export const Tag20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M18.52,30a3,3,0,0,1-2.12-.88L2.88,15.61A3,3,0,0,1,2,13.49V5A3,3,0,0,1,5,2h8.49a3,3,0,0,1,2.12.88L29.12,16.39a3,3,0,0,1,0,4.25l-8.48,8.48A3,3,0,0,1,18.52,30ZM5,4A1,1,0,0,0,4,5v8.49a1,1,0,0,0,.3.71L17.81,27.71a1,1,0,0,0,1.41,0l8.49-8.49a1,1,0,0,0,0-1.41L14.2,4.3a1,1,0,0,0-.71-.3H5Z" /><path d="M10,14a4,4,0,1,1,4-4A4,4,0,0,1,10,14Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,10,8Z" /></svg>
