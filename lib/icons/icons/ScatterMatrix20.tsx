import type { JSX } from "solid-js";
export const ScatterMatrix20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="9.5" cy="9.5" r="2.5" /><circle cx="9.5" cy="22.5" r="2.5" /><circle cx="22.5" cy="22.5" r="2.5" /><path d="M28,2H4A2.0023,2.0023,0,0,0,2,4V28a2.0023,2.0023,0,0,0,2,2H28a2.0023,2.0023,0,0,0,2-2V4A2.0023,2.0023,0,0,0,28,2Zm0,13H17V4H28ZM15,4V15H4V4ZM4,17H15V28H4ZM17,28V17H28V28Z" /></svg>
