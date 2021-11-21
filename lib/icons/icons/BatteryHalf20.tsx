import type { JSX } from "solid-js";
export const BatteryHalf20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M24,24H6a2,2,0,0,1-2-2V10A2,2,0,0,1,6,8H24a2,2,0,0,1,2,2v1h1a2,2,0,0,1,2,2v6a2,2,0,0,1-2,2H26v1A2,2,0,0,1,24,24ZM6,10V22H24V19h3V13H24V10Z" /><path d="M8 12H16V20H8z" transform="rotate(90 12 16)" /></svg>
