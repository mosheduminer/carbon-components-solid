import type { JSX } from "solid-js";
export const DataUnstructured32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M6 24a2 2 0 11-2 2 2 2 0 012-2m0-2a4 4 0 104 4A4 4 0 006 22zM16 4a2 2 0 11-2 2 2 2 0 012-2m0-2a4 4 0 104 4A4 4 0 0016 2zM26 4a2 2 0 11-2 2 2 2 0 012-2m0-2a4 4 0 104 4A4 4 0 0026 2zM18 24v4H14V24h4m2-2H12v8h8z" /><path d="M27,22.14V17a2,2,0,0,0-2-2H7V10h3V2H2v8H5v5a2,2,0,0,0,2,2H25v5.14a4,4,0,1,0,2,0ZM4,4H8V8H4ZM26,28a2,2,0,1,1,2-2A2,2,0,0,1,26,28Z" /></svg>
