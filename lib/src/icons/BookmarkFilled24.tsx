import type { JSX } from "solid-js";
export const BookmarkFilled24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M24,2H8A2,2,0,0,0,6,4V30l10-5.0538L26,30V4A2,2,0,0,0,24,2Z" /></svg>