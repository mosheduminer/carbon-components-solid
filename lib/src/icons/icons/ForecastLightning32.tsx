import type { JSX } from "solid-js";
export const ForecastLightning32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M15.67 24L13.934 23 16.221 19 12.332 19 16.325 12 18.062 13 15.778 17 19.668 17 15.67 24z" /><path d="M26,18A10,10,0,1,1,16,8h4v5l6-6L20,1V6H16A12,12,0,1,0,28,18Z" /></svg>
