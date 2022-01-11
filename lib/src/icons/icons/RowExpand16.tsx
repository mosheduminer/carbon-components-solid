import type { JSX } from "solid-js";
export const RowExpand16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M4 18L15 18 15 24.172 12.414 21.586 11 23 16 28 21 23 19.586 21.586 17 24.172 17 18 28 18 28 16 4 16 4 18zM26 4H6A2 2 0 004 6v4a2 2 0 002 2H26a2 2 0 002-2V6A2 2 0 0026 4zm0 6H6V6H26z" /></svg>
