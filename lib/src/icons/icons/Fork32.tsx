import type { JSX } from "solid-js";
export const Fork32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26,18a3.9962,3.9962,0,0,0-3.8579,3H17V11h5.1421a4,4,0,1,0,0-2H17a2.002,2.002,0,0,0-2,2v4H9.8579a4,4,0,1,0,0,2H15v4a2.002,2.002,0,0,0,2,2h5.1421A3.9934,3.9934,0,1,0,26,18ZM26,8a2,2,0,1,1-2,2A2.002,2.002,0,0,1,26,8ZM6,18a2,2,0,1,1,2-2A2.002,2.002,0,0,1,6,18Zm20,6a2,2,0,1,1,2-2A2.002,2.002,0,0,1,26,24Z" /></svg>
