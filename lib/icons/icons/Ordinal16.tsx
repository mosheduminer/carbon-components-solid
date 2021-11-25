import type { JSX } from "solid-js";
export const Ordinal16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M1,13 L1,12 L3,12 L3,9 L5.999,9 L6,6 L9,6 L9,3 L13,3 L13,12 L15,12 L15,13 L1,13 Z M5.999,10 L4,10 L4,12 L5.999,12 L5.999,10 Z M8.999,7 L6.999,7 L6.999,9 L7,9 L7,12 L8.999,12 L8.999,7 Z M12,4 L10,4 L10,12 L12,12 L12,4 Z" /></svg>