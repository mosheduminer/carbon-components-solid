import type { JSX } from "solid-js";
export const CenterSquare24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M6 12L4 12 4 4 12 4 12 6 6 6 6 12zM28 12L26 12 26 6 20 6 20 4 28 4 28 12zM12 28L4 28 4 20 6 20 6 26 12 26 12 28zM28 28L20 28 20 26 26 26 26 20 28 20 28 28zM15 10H17V14H15zM10 15H14V17H10zM18 15H22V17H18zM15 18H17V22H15z" /></svg>
