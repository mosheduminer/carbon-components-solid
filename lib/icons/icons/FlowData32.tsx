import type { JSX } from "solid-js";
export const FlowData32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M20,23H11.86a4.17,4.17,0,0,0-.43-1L22,11.43A3.86,3.86,0,0,0,24,12a4,4,0,1,0-3.86-5H11.86a4,4,0,1,0,0,2h8.28a4.17,4.17,0,0,0,.43,1L10,20.57A3.86,3.86,0,0,0,8,20a4,4,0,1,0,3.86,5H20v3h8V20H20ZM8,10a2,2,0,1,1,2-2A2,2,0,0,1,8,10ZM24,6a2,2,0,1,1-2,2A2,2,0,0,1,24,6ZM8,26a2,2,0,1,1,2-2A2,2,0,0,1,8,26Zm14-4h4v4H22Z" /></svg>
