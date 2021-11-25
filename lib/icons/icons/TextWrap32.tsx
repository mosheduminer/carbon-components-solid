import type { JSX } from "solid-js";
export const TextWrap32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M4 23H12V25H4zM24.5232 14H4v2H24.5a3.5 3.5 0 010 7H18.8281l2.586-2.5859L20 19l-5 5 5 5 1.4141-1.4141L18.8281 25H24.533a5.5 5.5 0 00-.01-11zM4 5H28V7H4z" /></svg>