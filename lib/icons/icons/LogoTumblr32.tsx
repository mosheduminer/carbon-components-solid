import type { JSX } from "solid-js";
export const LogoTumblr32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M22.6,28h-4c-3.59,0-6.3-1.86-6.3-6.3V14.58H9V10.72A7.17,7.17,0,0,0,14.3,4h3.76v6.12h4.36v4.46H18.06v6.2c0,1.86.94,2.49,2.42,2.49H22.6Z" /></svg>
