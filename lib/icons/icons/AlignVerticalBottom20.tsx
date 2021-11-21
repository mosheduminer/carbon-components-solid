import type { JSX } from "solid-js";
export const AlignVerticalBottom20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M2 26H30V28H2zM24 23H20a2.0023 2.0023 0 01-2-2V14a2.0023 2.0023 0 012-2h4a2.0023 2.0023 0 012 2v7A2.0023 2.0023 0 0124 23zm-4-9v7h4.0012L24 14zM12 23H8a2.0023 2.0023 0 01-2-2V6A2.0023 2.0023 0 018 4h4a2.0023 2.0023 0 012 2V21A2.0023 2.0023 0 0112 23zM8 6V21h4.0012L12 6z" /></svg>
