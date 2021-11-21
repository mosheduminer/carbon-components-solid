import type { JSX } from "solid-js";
export const ChartTSne20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="10" cy="20" r="2" /><circle cx="10" cy="28" r="2" /><circle cx="10" cy="14" r="2" /><circle cx="28" cy="4" r="2" /><circle cx="22" cy="6" r="2" /><circle cx="28" cy="10" r="2" /><circle cx="20" cy="12" r="2" /><circle cx="28" cy="22" r="2" /><circle cx="26" cy="28" r="2" /><circle cx="20" cy="26" r="2" /><circle cx="22" cy="20" r="2" /><circle cx="16" cy="4" r="2" /><circle cx="4" cy="24" r="2" /><circle cx="4" cy="16" r="2" /></svg>
