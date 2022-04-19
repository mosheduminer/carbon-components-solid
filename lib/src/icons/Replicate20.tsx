import type { JSX } from "solid-js";
export const Replicate20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28 8h2V4a2.0021 2.0021 0 00-2-2H24V4h4zM17 2H21V4H17zM28 11H30V15H28zM28 18v4H24V10a2.0023 2.0023 0 00-2-2H10V4h4V2H10A2.0023 2.0023 0 008 4V8H4a2.0023 2.0023 0 00-2 2V28a2.0023 2.0023 0 002 2H22a2.0023 2.0023 0 002-2V24h4a2.0023 2.0023 0 002-2V18zM22 28H4V10H22z" /></svg>