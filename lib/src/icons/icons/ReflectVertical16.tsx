import type { JSX } from "solid-js";
export const ReflectVertical16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16.79,19.386l7,9A1,1,0,0,1,23,30H9a1,1,0,0,1-.79-1.614l7-9a1,1,0,0,1,1.5791,0Z" /><path d="M15 2H17V30H15z" transform="rotate(-90 16 16)" /><path d="M16,13a1.001,1.001,0,0,1-.79-.386l-7-9A1,1,0,0,1,9,2H23a1,1,0,0,1,.79,1.614l-7,9A1.001,1.001,0,0,1,16,13ZM11.0444,4,16,10.3711,20.9556,4Z" /></svg>
