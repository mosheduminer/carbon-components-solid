import type { JSX } from "solid-js";
export const FolderShared32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,8H16L12.59,4.59A2,2,0,0,0,11.17,4H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10A2,2,0,0,0,28,8ZM22,26H14V25a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Zm6,0H24V25a3,3,0,0,0-3-3H15a3,3,0,0,0-3,3v1H4V6h7.17l3.42,3.41.58.59H28Z" /><path d="M14,17a4,4,0,1,0,4-4A4,4,0,0,0,14,17Zm4-2a2,2,0,1,1-2,2A2,2,0,0,1,18,15Z" /></svg>
