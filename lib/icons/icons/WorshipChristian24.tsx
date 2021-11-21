import type { JSX } from "solid-js";
export const WorshipChristian24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M17,30H15a2.0021,2.0021,0,0,1-2-2V14H8a2.0021,2.0021,0,0,1-2-2V10A2.0021,2.0021,0,0,1,8,8h5V4a2.0021,2.0021,0,0,1,2-2h2a2.0021,2.0021,0,0,1,2,2V8h5a2.0021,2.0021,0,0,1,2,2v2a2.0021,2.0021,0,0,1-2,2H19V28A2.0021,2.0021,0,0,1,17,30ZM8,10v2h7V28h2V12h7V10H17V4H15v6Z" /></svg>
