import type { JSX } from "solid-js";
export const BatteryQuarter24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M24,24H6a2.0023,2.0023,0,0,1-2-2V10A2.002,2.002,0,0,1,6,8H24a2.0023,2.0023,0,0,1,2,2v1h1a2.0023,2.0023,0,0,1,2,2v6a2.0027,2.0027,0,0,1-2,2H26v1A2.0027,2.0027,0,0,1,24,24ZM6,10V22H24V19h3V13H24V10Z" /><path d="M6 14H14V18H6z" transform="rotate(90 10 16)" /></svg>
