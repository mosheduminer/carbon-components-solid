import type { JSX } from "solid-js";
export const VirtualMachine32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M20,13H12a2.0025,2.0025,0,0,0-2,2V28a2.0025,2.0025,0,0,0,2,2h8a2.0025,2.0025,0,0,0,2-2V15A2.0025,2.0025,0,0,0,20,13Zm0,2,0,3H12V15Zm0,5,0,3H12V20Zm-8,8V25h8v3Z" /><path d="M25.91,10.13a.121.121,0,0,1-.0967-.0952A10.0061,10.0061,0,0,0,17.89,2.1816,10.0025,10.0025,0,0,0,6.1858,10.0347a.1212.1212,0,0,1-.0964.0957A7.5019,7.5019,0,0,0,7.4912,25H8V23H7.4954a5.5108,5.5108,0,0,1-5.4387-6.3,5.6992,5.6992,0,0,1,4.7138-4.6606l1.0166-.1836a.1306.1306,0,0,0,.1045-.1035l.18-.9351a8.28,8.28,0,0,1,6.8469-6.7427,7.957,7.957,0,0,1,2.8471.1245,8.22,8.22,0,0,1,6.1475,6.545l.1941,1.0083a.13.13,0,0,0,.1045.1035l1.0576.1914a5.7819,5.7819,0,0,1,3.1011,1.539A5.5052,5.5052,0,0,1,24.5076,23H24v2h.5076A7.5019,7.5019,0,0,0,25.91,10.13Z" /></svg>
