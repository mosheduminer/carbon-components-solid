import type { JSX } from "solid-js";
export const BringForward24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M12 15H10V12a2.0023 2.0023 0 012-2h3v2H12zM15 30H12a2.0023 2.0023 0 01-2-2V25h2v3h3zM18 28H22V30H18zM28 30H25V28h3V25h2v3A2.0023 2.0023 0 0128 30zM10 18H12V22H10zM28 18H30V22H28zM30 15H28V12H25V10h3a2.0023 2.0023 0 012 2zM18 10H22V12H18z" /><path d="M8,22H4a2.0023,2.0023,0,0,1-2-2V4A2.0023,2.0023,0,0,1,4,2H20a2.0023,2.0023,0,0,1,2,2V8H20V4H4V20H8Z" /></svg>
