import type { JSX } from "solid-js";
export const ListChecked32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16 8H30V10H16zM6 10.59L3.41 8 2 9.41 6 13.41 14 5.41 12.59 4 6 10.59zM16 22H30V24H16zM6 24.59L3.41 22 2 23.41 6 27.41 14 19.41 12.59 18 6 24.59z" /></svg>