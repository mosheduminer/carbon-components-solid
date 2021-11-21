import type { JSX } from "solid-js";
export const Monument24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M20,28V6L16,2,12,6V28H2v2H30V28Zm-6,0V6.8281l2-2,2,2V28Z" /></svg>
