import type { JSX } from "solid-js";
export const DataFormat32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M18 11H26V13H18zM6 19H14V21H6zM10 16a4 4 0 114-4A4.0045 4.0045 0 0110 16zm0-6a2 2 0 102 2A2.002 2.002 0 0010 10zM22 24a4 4 0 114-4A4.0045 4.0045 0 0122 24zm0-6a2 2 0 102 2A2.002 2.002 0 0022 18z" /><path d="M28,30H4a2.0021,2.0021,0,0,1-2-2V4A2.0021,2.0021,0,0,1,4,2H28a2.0021,2.0021,0,0,1,2,2V28A2.0021,2.0021,0,0,1,28,30ZM4,4V28H28V4Z" /></svg>
