import type { JSX } from "solid-js";
export const LetterGg16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M19 13a2 2 0 00-2 2v6a2 2 0 002 2h4v2H18v2h5a2 2 0 002-2V13zm4 8H19V15h4zM15 23H9a2 2 0 01-2-2V11A2 2 0 019 9h6v2H9V21h4V17H11V15h4z" /></svg>
