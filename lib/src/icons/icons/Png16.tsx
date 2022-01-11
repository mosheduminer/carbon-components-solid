import type { JSX } from "solid-js";
export const Png16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 23H24a2 2 0 01-2-2V11a2 2 0 012-2h6v2H24V21h4V17H26V15h4zM18 19L14.32 9 12 9 12 23 14 23 14 13 17.68 23 20 23 20 9 18 9 18 19zM4 23H2V9H8a2 2 0 012 2v5a2 2 0 01-2 2H4zm0-7H8V11H4z" /></svg>
