import type { JSX } from "solid-js";
export const StopSign20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M20.5857,29H11.4143A1.9865,1.9865,0,0,1,10,28.4141L3.5859,22A1.9865,1.9865,0,0,1,3,20.5857V11.4143A1.9865,1.9865,0,0,1,3.5859,10L10,3.5859A1.9865,1.9865,0,0,1,11.4143,3h9.1714A1.9865,1.9865,0,0,1,22,3.5859L28.4141,10A1.9865,1.9865,0,0,1,29,11.4143v9.1714A1.9865,1.9865,0,0,1,28.4141,22L22,28.4141A1.9865,1.9865,0,0,1,20.5857,29ZM11.4141,5,5,11.4141v9.1716L11.4141,27h9.1716L27,20.5859V11.4143L20.5859,5H11.4141Z" /></svg>
