import type { JSX } from "solid-js";
export const Grid32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M12 4H6A2 2 0 004 6v6a2 2 0 002 2h6a2 2 0 002-2V6A2 2 0 0012 4zm0 8H6V6h6zM26 4H20a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V6A2 2 0 0026 4zm0 8H20V6h6zM12 18H6a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V20A2 2 0 0012 18zm0 8H6V20h6zM26 18H20a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V20A2 2 0 0026 18zm0 8H20V20h6z" /></svg>