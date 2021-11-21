import type { JSX } from "solid-js";
export const QCZ24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M14 23H9a2 2 0 01-2-2V15a2 2 0 012-2h5v2H9v6h5zM24 9L16 9 16 11 22 11 16 21 16 23 24 23 24 21 18 21 24 11 24 9z" /></svg>
