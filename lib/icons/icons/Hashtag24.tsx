import type { JSX } from "solid-js";
export const Hashtag24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,12V10H22V4H20v6H12V4H10v6H4v2h6v8H4v2h6v6h2V22h8v6h2V22h6V20H22V12Zm-8,8H12V12h8Z" /></svg>
