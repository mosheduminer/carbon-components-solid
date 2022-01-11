import type { JSX } from "solid-js";
export const Corner20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,9H14V6H6v8H9V28h2V14h3V11H28ZM12,12H8V8h4Z" /></svg>
