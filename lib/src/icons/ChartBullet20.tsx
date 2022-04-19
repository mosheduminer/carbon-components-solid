import type { JSX } from "solid-js";
export const ChartBullet20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 22H16V21H14v1H2v6H14v1h2V28H30zM4 26V24H14v2zm24 0H16V24H28zM30 13H24V12H22v1H2v6H22v1h2V19h6zM4 17V15H22v2zm24 0H24V15h4zM30 4H10V3H8V4H2v6H8v1h2V10H30zM4 8V6H8V8zM28 8H10V6H28z" /></svg>