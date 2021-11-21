import type { JSX } from "solid-js";
export const MediaCast16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M2 26H5a3 3 0 00-3-3zM9 26H7a5.0057 5.0057 0 00-5-5V19A7.0078 7.0078 0 019 26z" /><path d="M13,26H11a9.01,9.01,0,0,0-9-9V15A11.0125,11.0125,0,0,1,13,26Z" /><path d="M28,26H15V24H28V8H4v5H2V8A2.0021,2.0021,0,0,1,4,6H28a2.0021,2.0021,0,0,1,2,2V24A2.0021,2.0021,0,0,1,28,26Z" /></svg>
