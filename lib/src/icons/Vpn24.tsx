import type { JSX } from "solid-js";
export const Vpn24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M14 23H12V9h6a2 2 0 012 2v5a2 2 0 01-2 2H14zm0-7h4V11H14zM28 19L24.32 9 22 9 22 23 24 23 24 13 27.68 23 30 23 30 9 28 9 28 19zM8 9L6 22 4 9 2 9 4.52 23 7.48 23 10 9 8 9z" /></svg>