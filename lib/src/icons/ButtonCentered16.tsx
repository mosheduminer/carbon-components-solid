import type { JSX } from "solid-js";
export const ButtonCentered16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M9 15H23V17H9z" /><path d="M28,22H4a2.0021,2.0021,0,0,1-2-2V12a2.0021,2.0021,0,0,1,2-2H28a2.0021,2.0021,0,0,1,2,2v8A2.0021,2.0021,0,0,1,28,22ZM4,12v8H28V12Z" /></svg>
