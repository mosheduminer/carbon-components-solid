import type { JSX } from "solid-js";
export const CircleDash20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M7.7 4.7a14.7 14.7 0 00-3 3.1L6.3 9A13.26 13.26 0 018.9 6.3zM4.6 12.3l-1.9-.6A12.51 12.51 0 002 16H4A11.48 11.48 0 014.6 12.3zM2.7 20.4a14.4 14.4 0 002 3.9l1.6-1.2a12.89 12.89 0 01-1.7-3.3zM7.8 27.3a14.4 14.4 0 003.9 2l.6-1.9A12.89 12.89 0 019 25.7zM11.7 2.7l.6 1.9A11.48 11.48 0 0116 4V2A12.51 12.51 0 0011.7 2.7zM24.2 27.3a15.18 15.18 0 003.1-3.1L25.7 23A11.53 11.53 0 0123 25.7zM27.4 19.7l1.9.6A15.47 15.47 0 0030 16H28A11.48 11.48 0 0127.4 19.7zM29.2 11.6a14.4 14.4 0 00-2-3.9L25.6 8.9a12.89 12.89 0 011.7 3.3zM24.1 4.6a14.4 14.4 0 00-3.9-2l-.6 1.9a12.89 12.89 0 013.3 1.7zM20.3 29.3l-.6-1.9A11.48 11.48 0 0116 28v2A21.42 21.42 0 0020.3 29.3z" /></svg>
