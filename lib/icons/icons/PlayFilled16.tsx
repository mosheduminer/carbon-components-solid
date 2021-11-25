import type { JSX } from "solid-js";
export const PlayFilled16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M8,1C4.1,1,1,4.1,1,8s3.1,7,7,7s7-3.1,7-7S11.9,1,8,1z M11.7,8.4l-5.5,3c-0.2,0.1-0.3,0.1-0.5,0c-0.2-0.1-0.2-0.3-0.2-0.4V5	c0-0.2,0.1-0.3,0.2-0.4c0.2-0.1,0.3-0.1,0.5,0l5.5,3C12,7.7,12.1,8,11.9,8.2C11.9,8.3,11.8,8.4,11.7,8.4L11.7,8.4z" /></svg>