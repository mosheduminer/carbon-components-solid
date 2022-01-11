import type { JSX } from "solid-js";
export const Wifi16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="16" cy="25" r="2" /><path d="M10.47,19.2334l1.4136,1.4131a5.9688,5.9688,0,0,1,8.2229-.0093L21.52,19.2236a7.9629,7.9629,0,0,0-11.05.01Z" /><path d="M6.229,14.9927l1.4136,1.4135a11.955,11.955,0,0,1,16.7041-.01L25.76,14.9829a13.9514,13.9514,0,0,0-19.5313.01Z" /><path d="M30,10.7412a19.94,19.94,0,0,0-28,0v.0225L3.4043,12.168a17.9336,17.9336,0,0,1,25.1811-.01L30,10.7432Z" /></svg>
