import type { JSX } from "solid-js";
export const PauseFilled24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M12 6H10A2 2 0 008 8V24a2 2 0 002 2h2a2 2 0 002-2V8a2 2 0 00-2-2zM22 6H20a2 2 0 00-2 2V24a2 2 0 002 2h2a2 2 0 002-2V8a2 2 0 00-2-2z" /></svg>
