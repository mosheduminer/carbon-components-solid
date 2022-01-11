import type { JSX } from "solid-js";
export const Blog16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M4 24H14V26H4zM4 18H14V20H4zM26 14H6a2 2 0 01-2-2V6A2 2 0 016 4H26a2 2 0 012 2v6A2 2 0 0126 14zM6 6v6H26V6zM26 28H20a2 2 0 01-2-2V20a2 2 0 012-2h6a2 2 0 012 2v6A2 2 0 0126 28zm-6-8v6h6V20z" /></svg>
