import type { JSX } from "solid-js";
export const JoinOuter32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M20 6a9.9539 9.9539 0 00-4 .8379 9.9953 9.9953 0 010 18.3242A9.9988 9.9988 0 1020 6zM10 16a9.9976 9.9976 0 016-9.1621 10 10 0 100 18.3242A9.9976 9.9976 0 0110 16z" /></svg>
