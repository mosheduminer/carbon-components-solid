import type { JSX } from "solid-js";
export const Pills32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M22,14a7.94,7.94,0,0,0-4,1.0825V9A7,7,0,0,0,4,9V23a6.999,6.999,0,0,0,12.2855,4.5878A7.9969,7.9969,0,1,0,22,14Zm0,2a6.0046,6.0046,0,0,1,5.91,5H16.09A6.0046,6.0046,0,0,1,22,16ZM6,9A5,5,0,0,1,16,9v6H6Zm5,19a5.0059,5.0059,0,0,1-5-5V17h9.765a7.9566,7.9566,0,0,0-.7242,8.9315A4.9885,4.9885,0,0,1,11,28Zm11,0a6.0046,6.0046,0,0,1-5.91-5H27.91A6.0046,6.0046,0,0,1,22,28Z" /></svg>