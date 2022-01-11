import type { JSX } from "solid-js";
export const Mpeg20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M32 21H28a2.0023 2.0023 0 01-2-2V13a2.002 2.002 0 012-2h4v2H28v6h2V17H29l0-2h3zM24 13L24 11.024 18 11.024 18 21 24 21 24 19 20 19 20 17 22 17 22 15 20 15 20 13 24 13zM14 11H9V21h2V18h3a2.0027 2.0027 0 002-2V13A2.0023 2.0023 0 0014 11zm-3 5V13h3l.001 3zM7 11L5 11 3.5 15 2 11 0 11 0 21 2 21 2 14 3.5 18 5 14 5 21 7 21 7 11z" /></svg>
