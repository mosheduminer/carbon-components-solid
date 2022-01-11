import type { JSX } from "solid-js";
export const Raw20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M29.2 9L28.86 17 28.6 21.54 28.19 18 27.51 12.54 25.49 12.54 24.81 18 24.4 21.54 24.14 17 23.8 9 22 9 23 23 25.27 23 26.03 18.07 26.49 14 26.5 13.97 26.51 14 26.97 18.07 27.73 23 30 23 31 9 29.2 9zM18 9H14a2 2 0 00-2 2V23h2V18h4v5h2V11A2 2 0 0018 9zm-4 7V11h4v5zM10 15V11A2 2 0 008 9H2V23H4V17H5.48l2.34 6H10L7.63 17H8A2 2 0 0010 15zM4 11H8v4H4z" /></svg>
