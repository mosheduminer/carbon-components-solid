import type { JSX } from "solid-js";
export const Paragraph20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M27,4H13a7,7,0,0,0,0,14V28h2V6h5V28h2V6h5ZM13,16A5,5,0,0,1,13,6Z" /></svg>
