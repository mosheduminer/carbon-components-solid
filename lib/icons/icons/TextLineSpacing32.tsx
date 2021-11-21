import type { JSX } from "solid-js";
export const TextLineSpacing32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M17 6H30V8H17zM17 12H27V14H17zM17 18H30V20H17zM17 24H27V26H17zM11.59 13.41L8 9.83 8 9.83 4.41 13.42 3 12 8 7 13 12 11.59 13.41zM11.59 18.59L8 22.17 8 22.17 4.41 18.58 3 20 8 25 13 20 11.59 18.59z" /></svg>
