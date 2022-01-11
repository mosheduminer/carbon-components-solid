import type { JSX } from "solid-js";
export const ChooseItem32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28 6H30V26H28zM17 6L15.57 7.393 23.15 15 2 15 2 17 23.15 17 15.57 24.573 17 26 27 16 17 6z" /></svg>
