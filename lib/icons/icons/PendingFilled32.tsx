import type { JSX } from "solid-js";
export const PendingFilled32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM8,18a2,2,0,1,1,2-2A2,2,0,0,1,8,18Zm8,0a2,2,0,1,1,2-2A2,2,0,0,1,16,18Zm8,0a2,2,0,1,1,2-2A2,2,0,0,1,24,18Z" /><path fill="none" d="M10,16a2,2,0,1,1-2-2A2,2,0,0,1,10,16Zm6-2a2,2,0,1,0,2,2A2,2,0,0,0,16,14Zm8,0a2,2,0,1,0,2,2A2,2,0,0,0,24,14Z" data-icon-path="inner-path" /></svg>
