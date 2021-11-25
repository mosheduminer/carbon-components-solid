import type { JSX } from "solid-js";
export const WifiBridge32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M6.9492,20.95l-1.414-1.4141a5,5,0,0,0,0-7.0715L6.9492,11.05a7,7,0,0,1,0,9.9Z" /><path d="M10.4854 24.4854L9.0713 23.0713a10.0011 10.0011 0 000-14.1426l1.4141-1.4141a12.0006 12.0006 0 010 16.9708zM25.0508 20.95a7 7 0 010-9.9l1.414 1.4146a5 5 0 000 7.0715z" /><path d="M21.5146 24.4854a12.0006 12.0006 0 010-16.9708l1.4141 1.4141a10.0011 10.0011 0 000 14.1426zM3 15H2V4H0V28H2V17H3a1 1 0 000-2zM30 4V15H29a1 1 0 000 2h1V28h2V4z" /></svg>