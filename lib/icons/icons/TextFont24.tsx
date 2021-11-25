import type { JSX } from "solid-js";
export const TextFont24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M25 12H20v2h5a1.0008 1.0008 0 011 1v2H22a3.0033 3.0033 0 00-3 3v1a3.0033 3.0033 0 003 3h6V15A3.0033 3.0033 0 0025 12zM22 22a1.0008 1.0008 0 01-1-1V20a1.0008 1.0008 0 011-1h4v3zM16 24h2L12 7H10L4 24H6l1.6936-5h6.6135zM8.3711 17l2.4966-7.3711.2668.0005L13.63 17z" /></svg>