import type { JSX } from "solid-js";
export const Hd20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,6H4A2,2,0,0,0,2,8V24a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V8A2,2,0,0,0,28,6ZM4,24V8H28V24Z" /><path d="M22 11H18V21h4a3 3 0 003-3V14A3 3 0 0022 11zm1 7a1 1 0 01-1 1H20V13h2a1 1 0 011 1zM13 11L13 15 10 15 10 11 8 11 8 21 10 21 10 17 13 17 13 21 15 21 15 11 13 11z" /></svg>
