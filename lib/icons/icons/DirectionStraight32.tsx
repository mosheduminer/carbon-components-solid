import type { JSX } from "solid-js";
export const DirectionStraight32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16 4L9 11 10.414 12.414 15 7.828 15 28 17 28 17 7.828 21.586 12.414 23 11 16 4z" /></svg>
