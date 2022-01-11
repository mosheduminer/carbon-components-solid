import type { JSX } from "solid-js";
export const MilitaryCamp32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M27,28v-10.48a2.0035,2.0035,0,0,0-.853-1.6387L17,9.48V8h6V2H15V9.48L5.8528,15.8823A2.0023,2.0023,0,0,0,5,17.5205V28H2v2H30V28ZM17,4h4V6H17ZM7,17.5205l9-6.3,9,6.3V28H17V20H15v8H7Z" /></svg>
