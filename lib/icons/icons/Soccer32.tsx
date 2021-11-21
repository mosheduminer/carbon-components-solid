import type { JSX } from "solid-js";
export const Soccer32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="17" cy="28" r="2" /><path d="M7.55 17.5H15.45V19.5H7.55z" transform="rotate(-45 11.5 18.5)" /><path d="M28 16.584L19.4143 8H6v2H18.5857l3 3L6 28.5859 7.4141 30 23 14.415 26.584 18 23 21.5859 24.4141 23 28 19.416A2.0044 2.0044 0 0028 16.584zM24.5 9A3.5 3.5 0 1128 5.5 3.504 3.504 0 0124.5 9zm0-5A1.5 1.5 0 1026 5.5 1.5017 1.5017 0 0024.5 4z" /></svg>
