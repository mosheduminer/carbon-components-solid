import type { JSX } from "solid-js";
export const WindyDust20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M23 28a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H22V18h1a5 5 0 010 10zM16 18H20V20H16zM10 18H14V20H10zM4 18H8V20H4zM21 15H20V13h1a3 3 0 10-3-3H16a5 5 0 115 5zM14 13H18V15H14zM8 13H12V15H8z" /></svg>
