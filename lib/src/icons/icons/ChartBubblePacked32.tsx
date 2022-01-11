import type { JSX } from "solid-js";
export const ChartBubblePacked32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M27.5322,17.1724A8.99,8.99,0,1,0,13.6074,5.88,5.9969,5.9969,0,1,0,5.051,13.2217a6.9967,6.9967,0,1,0,7.9942,11.4844A5.9981,5.9981,0,0,0,25,24c0-.1216-.011-.24-.0181-.3594a3.4873,3.4873,0,1,0,2.55-6.4682ZM21,4a7,7,0,1,1-7,7A7.0078,7.0078,0,0,1,21,4ZM8,4A4,4,0,1,1,4,8,4.0045,4.0045,0,0,1,8,4ZM19,28a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,19,28Z" /></svg>
