import type { JSX } from "solid-js";
export const LetterBb20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23 13H19V9H17V23h6a2 2 0 002-2V15A2 2 0 0023 13zm-4 8V15h4v6zM15 12a3 3 0 00-3-3H7V23h5a3 3 0 003-3V18a3 3 0 00-.78-2A3 3 0 0015 14zM9 11h3a1 1 0 011 1v2a1 1 0 01-1 1H9zm4 9a1 1 0 01-1 1H9V17h3a1 1 0 011 1z" /></svg>
