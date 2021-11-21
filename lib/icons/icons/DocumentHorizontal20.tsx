import type { JSX } from "solid-js";
export const DocumentHorizontal20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,6H4A2.0023,2.0023,0,0,0,2,8V24a2.0023,2.0023,0,0,0,2,2H28a2.0023,2.0023,0,0,0,2-2V8A2.0023,2.0023,0,0,0,28,6ZM20,24H12V22a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Zm8,0H22V22a3,3,0,0,0-3-3H13a3,3,0,0,0-3,3v2H4V8H28Z" /><path d="M16,18a4,4,0,1,0-4-4A4,4,0,0,0,16,18Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,16,12Z" /></svg>
