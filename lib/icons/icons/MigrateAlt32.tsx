import type { JSX } from "solid-js";
export const MigrateAlt32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,4H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6A2,2,0,0,0,28,4Zm0,22H12V20H10v6H4V17H20.1719l-3.586,3.5859L18,22l6-6-6-6-1.4141,1.4141L20.1719,15H4V6h6v6h2V6H28Z" /></svg>
