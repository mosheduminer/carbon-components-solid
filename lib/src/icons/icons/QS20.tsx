import type { JSX } from "solid-js";
export const QS20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M18,23H12V21h6V17H14a2,2,0,0,1-2-2V11a2,2,0,0,1,2-2h6v2H14v4h4a2,2,0,0,1,2,2v4A2,2,0,0,1,18,23Z" /></svg>
