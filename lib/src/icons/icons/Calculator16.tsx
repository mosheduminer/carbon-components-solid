import type { JSX } from "solid-js";
export const Calculator16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26,4V28H6V4H26m0-2H6A2,2,0,0,0,4,4V28a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V4A2,2,0,0,0,26,2Z" /><path d="M9 23H11V25H9zM21 23H23V25H21zM9 18H11V20H9zM21 18H23V20H21zM9 13H11V15H9zM15 23H17V25H15zM15 18H17V20H15zM15 13H17V15H15zM21 13H23V15H21zM9 7H23V10H9z" /></svg>
