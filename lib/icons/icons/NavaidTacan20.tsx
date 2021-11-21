import type { JSX } from "solid-js";
export const NavaidTacan20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="16" cy="14" r="2" /><path d="M20,28H12a1,1,0,0,1-1-1V21.2656L7.2612,14.7231,2.4854,11.8574a1,1,0,0,1-.3536-1.3535l4-7a1,1,0,0,1,1.3828-.3613L12.2769,6h7.4462l4.7623-2.8574a1,1,0,0,1,1.3828.3613l4,7a1,1,0,0,1-.3536,1.3535l-4.7758,2.8657L21,21.2656V27A1,1,0,0,1,20,28Zm-7-2h6V20.7346l4.2616-7.4578,4.3844-2.6306L24.6387,5.3831,20.277,8H11.723L7.3613,5.3831,4.354,10.6462l4.3844,2.6306L13,20.7346Z" /></svg>
