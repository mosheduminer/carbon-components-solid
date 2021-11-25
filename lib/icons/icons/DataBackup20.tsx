import type { JSX } from "solid-js";
export const DataBackup20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="7" cy="7" r="1" /><circle cx="7" cy="15" r="1" /><circle cx="7" cy="23" r="1" /><path d="M12,26H4V20h8V18H4V12H22V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V26a2,2,0,0,0,2,2h8ZM4,4H20v6H4Z" /><path d="M28,17v2.4131A6.996,6.996,0,1,0,22,30V28a5,5,0,1,1,4.5762-7H24v2h6V17Z" /></svg>