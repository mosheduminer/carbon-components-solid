import type { JSX } from "solid-js";
export const GenderFemale20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M17,19.9307a8,8,0,1,0-2,0V22H10v2h5v4h2V24h5V22H17ZM10,12a6,6,0,1,1,6,6A6.0066,6.0066,0,0,1,10,12Z" /></svg>
