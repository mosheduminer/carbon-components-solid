import type { JSX } from "solid-js";
export const LetterPp16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23 13H17V27h2V23h4a2 2 0 002-2V15A2 2 0 0023 13zm-4 8V15h4v6zM9 23H7V9h6a2 2 0 012 2v5a2 2 0 01-2 2H9zm0-7h4V11H9z" /></svg>
