import type { JSX } from "solid-js";
export const ChartColumnFloating32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28 22H20V4h8zm-6-2h4V6H22zM16 24H8V10h8zm-6-2h4V12H10z" /><path d="M30,30H4a2.0021,2.0021,0,0,1-2-2V2H4V28H30Z" /></svg>
