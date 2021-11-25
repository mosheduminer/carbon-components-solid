import type { JSX } from "solid-js";
export const List24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M10 6H28V8H10zM10 24H28V26H10zM10 15H28V17H10zM4 15H6V17H4zM4 6H6V8H4zM4 24H6V26H4z" /></svg>