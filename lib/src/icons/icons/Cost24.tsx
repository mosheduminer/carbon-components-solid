import type { JSX } from "solid-js";
export const Cost24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16,23a7,7,0,1,1,7-7A7.0078,7.0078,0,0,1,16,23Zm0-12a5,5,0,1,0,5,5A5.0057,5.0057,0,0,0,16,11Z" /><path d="M30,6.4141,28.5859,5l-3.35,3.35A12.0812,12.0812,0,0,0,23.65,6.7637L27,3.4141,25.5859,2,21.9766,5.6094A11.9792,11.9792,0,0,0,5.6094,21.9766L2,25.5859,3.4141,27l3.35-3.35A12.0812,12.0812,0,0,0,8.35,25.2363L5,28.5859,6.4141,30l3.6093-3.6094A11.9792,11.9792,0,0,0,26.3906,10.0234ZM16,26A10,10,0,1,1,26,16,10.0114,10.0114,0,0,1,16,26Z" /></svg>
