import type { JSX } from "solid-js";
export const SortAscending16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M18 22L19.414 20.586 23 24.172 23 4 25 4 25 24.172 28.586 20.586 30 22 24 28 18 22zM2 18H16V20H2zM6 12H16V14H6zM10 6H16V8H10z" /></svg>
