import type { JSX } from "solid-js";
export const Harbor32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M27,17A11.0109,11.0109,0,0,1,17,27.9492V14h6V12H17V9.8579a4,4,0,1,0-2,0V12H9v2h6V27.9492A11.0109,11.0109,0,0,1,5,17H3a13,13,0,0,0,26,0ZM14,6a2,2,0,1,1,2,2A2.0023,2.0023,0,0,1,14,6Z" /></svg>
