import type { JSX } from "solid-js";
export const PanVertical32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M10 8L11.414 9.414 15 5.828 15 26.172 11.414 22.586 10 24 16 30 22 24 20.586 22.586 17 26.172 17 5.828 20.586 9.414 22 8 16 2 10 8z" /></svg>
