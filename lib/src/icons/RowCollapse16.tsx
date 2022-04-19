import type { JSX } from "solid-js";
export const RowCollapse16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26 20H6a2 2 0 00-2 2v4a2 2 0 002 2H26a2 2 0 002-2V22A2 2 0 0026 20zm0 6H6V22H26zM17 7.828L19.586 10.414 21 9 16 4 11 9 12.414 10.414 15 7.828 15 14 4 14 4 16 28 16 28 14 17 14 17 7.828z" /></svg>