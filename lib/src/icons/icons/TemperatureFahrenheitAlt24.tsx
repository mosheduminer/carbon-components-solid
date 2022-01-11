import type { JSX } from "solid-js";
export const TemperatureFahrenheitAlt24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26 11L26 9 15 9 15 27 17 27 17 19 25 19 25 17 17 17 17 11 26 11zM8 13a4 4 0 114-4h0A4.0118 4.0118 0 018 13zM8 7a2 2 0 102 2h0A2.0059 2.0059 0 008 7z" /></svg>
