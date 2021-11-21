import type { JSX } from "solid-js";
export const DrillDown16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M10 6L11.414 4.586 15 8.172 15 0 17 0 17 8.172 20.586 4.586 22 6 16 12 10 6z" /><path d="M22,16a5.9815,5.9815,0,0,0-1.7573-4.2427L16,16l-4.2427-4.2427A6,6,0,1,0,22,16Z" /><path d="M30,16a13.9581,13.9581,0,0,0-4.105-9.895L24.4814,7.5188a12,12,0,1,1-16.9628,0L6.105,6.105A13.9974,13.9974,0,1,0,30,16Z" /></svg>
