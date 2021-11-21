import type { JSX } from "solid-js";
export const AccumulationSnow32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M12 2H14V4H12zM14 4H16V6H14zM16 6H18V8H16zM16 2H18V4H16zM12 6H14V8H12zM14 18H16V20H14zM16 20H18V22H16zM18 22H20V24H18zM18 18H20V20H18zM14 22H16V24H14zM18 10H20V12H18zM20 12H22V14H20zM22 14H24V16H22zM22 10H24V12H22zM18 14H20V16H18z" /><path d="M28,4a2.0023,2.0023,0,0,0-2,2V26H6V22h4V20H6V16h4V14H6V10h4V8H6V6A2.0023,2.0023,0,0,0,4,4H2V6H4V26a2.0023,2.0023,0,0,0,2,2H26a2.0023,2.0023,0,0,0,2-2V6h2V4Z" /></svg>
