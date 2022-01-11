import type { JSX } from "solid-js";
export const LetterSs32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M22 23H17V21h5V19H19a2 2 0 01-2-2V15a2 2 0 012-2h5v2H19v2h3a2 2 0 012 2v2A2 2 0 0122 23zM13 23H7V21h6V17H9a2 2 0 01-2-2V11A2 2 0 019 9h6v2H9v4h4a2 2 0 012 2v4A2 2 0 0113 23z" /></svg>
