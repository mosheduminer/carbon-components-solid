import type { JSX } from "solid-js";
export const SendToBack20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,10H22V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V20a2,2,0,0,0,2,2h6v6a2.0023,2.0023,0,0,0,2,2H28a2.0023,2.0023,0,0,0,2-2V12A2.0023,2.0023,0,0,0,28,10ZM12,28V12H28l.0015,16Z" /></svg>