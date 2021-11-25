import type { JSX } from "solid-js";
export const AlignHorizontalLeft20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26 26H11a2.0023 2.0023 0 01-2-2V20a2.0023 2.0023 0 012-2H26a2.0023 2.0023 0 012 2v4A2.0023 2.0023 0 0126 26zm0-6.0012L11 20v4H26zM18 14H11a2.0023 2.0023 0 01-2-2V8a2.0023 2.0023 0 012-2h7a2.0023 2.0023 0 012 2v4A2.0023 2.0023 0 0118 14zm0-6.0012L11 8v4h7zM4 2H6V30H4z" /></svg>