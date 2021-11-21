import type { JSX } from "solid-js";
export const IncompleteGlyph = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2ZM8,4a4.0045,4.0045,0,0,1,4,4H4A4.0045,4.0045,0,0,1,8,4Z" /></svg>
