import type { JSX } from "solid-js";
export const LetterCc16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M24 23H19a2 2 0 01-2-2V15a2 2 0 012-2h5v2H19v6h5zM15 23H9a2 2 0 01-2-2V11A2 2 0 019 9h6v2H9V21h6z" /></svg>