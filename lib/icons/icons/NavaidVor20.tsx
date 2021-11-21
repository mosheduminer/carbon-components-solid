import type { JSX } from "solid-js";
export const NavaidVor20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="16" cy="16" r="2" /><path d="M30.8638,15.4961l-7-12A1,1,0,0,0,23,3H9a1,1,0,0,0-.8638.4961l-7,12a1,1,0,0,0,0,1.0078l7,12A1,1,0,0,0,9,29H23a1,1,0,0,0,.8638-.4961l7-12a1,1,0,0,0,0-1.0078ZM22.4258,27H9.5742L3.1577,16,9.5742,5H22.4258l6.4165,11Z" /></svg>
