import type { JSX } from "solid-js";
export const AccessibilityColor32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M16,20a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,16,20Zm0-6a2,2,0,1,0,2,2A2.0021,2.0021,0,0,0,16,14Z" /><path d="M16,24a10.6547,10.6547,0,0,1-9.97-7.7576L5.9692,16l.0606-.2424A10.6547,10.6547,0,0,1,16,8a10.6547,10.6547,0,0,1,9.97,7.7576L26.0308,16l-.0606.2424A10.6547,10.6547,0,0,1,16,24ZM8.0352,16A8.5975,8.5975,0,0,0,16,22a8.5975,8.5975,0,0,0,7.9648-6A8.5975,8.5975,0,0,0,16,10,8.5975,8.5975,0,0,0,8.0352,16Z" /><path d="M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z" /></svg>