import type { JSX } from "solid-js";
export const ZAxis24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M26 22L26 25.586 17 16.586 17 10 17 6 17 5.828 19.586 8.414 21 7 16 2 11 7 12.414 8.414 15 5.828 15 6 15 10 15 16.586 6 25.586 6 22 4 22 4 29 11 29 11 27 7.414 27 16 18.414 24.586 27 21 27 21 29 28 29 28 22 26 22z" /></svg>
