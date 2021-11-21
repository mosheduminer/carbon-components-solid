import type { JSX } from "solid-js";
export const ListDropdown16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26,6V2H2V12h9V30H30V6ZM4,10V4H24V6H11v4ZM28,28H13V8H28Z" /><path d="M15 11H17V13H15zM19 11H26V13H19zM15 17H17V19H15zM19 17H26V19H19zM15 23H17V25H15zM19 23H26V25H19z" /></svg>
