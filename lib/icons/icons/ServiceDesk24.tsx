import type { JSX } from "solid-js";
export const ServiceDesk24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,24V22A12.01,12.01,0,0,0,17,10.0507V8h3V6H12V8h3v2.0507A12.01,12.01,0,0,0,4,22v2H2v2H30V24ZM16,12a10.0167,10.0167,0,0,1,9.7984,8H6.2015A10.0165,10.0165,0,0,1,16,12ZM6,22H26v2H6Z" transform="translate(0 .005)" /></svg>
