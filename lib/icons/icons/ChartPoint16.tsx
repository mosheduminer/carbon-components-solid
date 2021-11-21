import type { JSX } from "solid-js";
export const ChartPoint16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30,30H4a2.0023,2.0023,0,0,1-2-2V2H4V28H30Z" /><circle cx="9" cy="6" r="3" /><circle cx="9" cy="22" r="3" /><circle cx="18" cy="14" r="3" /><path d="M9,17a3,3,0,1,1,3-3A3.0033,3.0033,0,0,1,9,17Zm0-4a1,1,0,1,0,1,1A1.001,1.001,0,0,0,9,13Z" /><circle cx="27" cy="6" r="3" /><circle cx="27" cy="22" r="3" /><path d="M27 17a3 3 0 113-3A3.0033 3.0033 0 0127 17zm0-4a1 1 0 101 1A1.001 1.001 0 0027 13zM18 26a3 3 0 113-3A3.0033 3.0033 0 0118 26zm0-4a1 1 0 101 1A1.001 1.001 0 0018 22zM18 8a3 3 0 113-3A3.0033 3.0033 0 0118 8zm0-4a1 1 0 101 1A1.001 1.001 0 0018 4z" /></svg>
