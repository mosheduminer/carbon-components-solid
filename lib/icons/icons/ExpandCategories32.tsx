import type { JSX } from "solid-js";
export const ExpandCategories32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M20 26H26V28H20zM20 18H28V20H20zM20 10H30V12H20zM15 4H17V28H15zM10.586 3.959L7 7.249 3.412 3.958 2 5.373 7 10 12 5.373 10.586 3.959z" /></svg>