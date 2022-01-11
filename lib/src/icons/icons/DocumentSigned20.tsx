import type { JSX } from "solid-js";
export const DocumentSigned20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M19.4141,30H15V25.5857l5.0337-5.0337A4.6069,4.6069,0,0,1,20,20a5,5,0,1,1,4.4478,4.9663ZM17,28h1.5859l5.2061-5.2063.5395.1238a3.0351,3.0351,0,1,0-2.249-2.2488l.1236.5393L17,26.4143Z" /><circle cx="25" cy="20" r="1" /><path d="M8 6H20V8H8zM8 10H20V12H8zM8 14H14V16H8zM8 24H12V26H8z" /><path d="M12,30H6a2.0021,2.0021,0,0,1-2-2V4A2.0021,2.0021,0,0,1,6,2H22a2.0021,2.0021,0,0,1,2,2v9H22V4H6V28h6Z" /></svg>
