import type { JSX } from "solid-js";
export const QCU320 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M10 23H5a2 2 0 01-2-2V15a2 2 0 012-2h5v2H5v6h5zM18 23H14a2 2 0 01-2-2V9h2V21h4V9h2V21A2 2 0 0118 23zM28 9H22v2h6v4H23v2h5v4H22v2h6a2 2 0 002-2V11A2 2 0 0028 9z" /></svg>
