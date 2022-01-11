import type { JSX } from "solid-js";
export const Sunrise24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M2 27H29.998V29H2zM16 20a4.0045 4.0045 0 014 4h2a6 6 0 00-12 0h2A4.0045 4.0045 0 0116 20zM25 22H30V24H25z" /><path d="M21.668 14.854H26.625999999999998V16.854H21.668z" transform="rotate(-45 24.146 15.854)" /><path d="M16 4L11 9 12.41 10.41 15 7.83 15 8 15 15 17 15 17 8 17 7.83 19.59 10.41 21 9 16 4z" /><path d="M6.854 13.374H8.854V18.332H6.854z" transform="rotate(-45 7.854 15.854)" /><path d="M2 22H7V24H2z" /></svg>
