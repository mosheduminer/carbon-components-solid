import type { JSX } from "solid-js";
export const DoubleInteger16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M17 8V6H13V2H11V6H8V2H6V6H2V8H6v3H2v2H6v4H8V13h3v4h2V13h4V11H13V8zm-6 3H8V8h3zM30 21V19H26V15H24v4H21V15H19v4H15v2h4v3H15v2h4v4h2V26h3v4h2V26h4V24H26V21zm-6 3H21V21h3z" /></svg>
