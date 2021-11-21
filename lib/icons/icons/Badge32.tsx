import type { JSX } from "solid-js";
export const Badge32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23 2L24.593 5 28 5.414 25.5 7.667 26 11 23 9.125 20 11 20.5 7.667 18 5.414 21.5 5 23 2z" /><path d="M22.7168,13.249l-1.9375-.498A6.9942,6.9942,0,1,1,15.7505,4.22l.499-1.9365A8.99,8.99,0,0,0,8,17.689V30l6-4,6,4V17.7078A8.9627,8.9627,0,0,0,22.7168,13.249ZM18,26.2627l-4-2.6665-4,2.6665V19.05a8.9238,8.9238,0,0,0,8,.0062Z" /></svg>
