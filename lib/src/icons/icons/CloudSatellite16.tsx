import type { JSX } from "solid-js";
export const CloudSatellite16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="9" cy="20" r="2" /><path d="M16,20a4,4,0,1,1,4-4A4.0118,4.0118,0,0,1,16,20Zm0-6a2,2,0,1,0,2,2A2.0059,2.0059,0,0,0,16,14Z" /><circle cx="23" cy="12" r="2" /><path d="M16,31a.9988.9988,0,0,1-.5039-.1357l-12-7A1.0008,1.0008,0,0,1,3,23V9a.9994.9994,0,0,1,.4961-.8638l12-7a1,1,0,0,1,1.0078,0l12,7L27.4961,9.8638,16,3.1577,5,9.5742V22.4258l11,6.417,11-6.417V15h2v8a1.0008,1.0008,0,0,1-.4961.8643l-12,7A.9988.9988,0,0,1,16,31Z" /></svg>
