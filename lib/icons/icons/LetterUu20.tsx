import type { JSX } from "solid-js";
export const LetterUu20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23 23H19a2 2 0 01-2-2V13h2v8h4V13h2v8A2 2 0 0123 23zM13 23H9a2 2 0 01-2-2V9H9V21h4V9h2V21A2 2 0 0113 23z" /></svg>
