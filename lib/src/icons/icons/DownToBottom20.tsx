import type { JSX } from "solid-js";
export const DownToBottom20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16 18L6 8 7.4 6.6 16 15.2 24.6 6.6 26 8zM4 22H28V24H4z" /></svg>
