import type { JSX } from "solid-js";
export const ThunderstormStrong24 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="24" height="24"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M21 30a1 1 0 01-.8944-1.4474l2-4.0005a1 1 0 111.7888.8947l-2 4A.9981.9981 0 0121 30zM9 32a1 1 0 01-.8944-1.4474l2-4.0005a1 1 0 111.7888.8947l-2 4A.9981.9981 0 019 32zM15.901 30.496L14.165 29.504 17.31 24 11.31 24 16.165 15.504 17.901 16.496 14.756 22 20.757 22 15.901 30.496z" /><path d="M24.8008,9.1362a8.9943,8.9943,0,0,0-17.6006,0,6.4929,6.4929,0,0,0,.23,12.7681L6.106,24.5527a1,1,0,1,0,1.7885.8946l2-4a1,1,0,0,0-.447-1.3418A.9786.9786,0,0,0,9,20.01V20H8.5a4.4975,4.4975,0,0,1-.356-8.981l.8155-.0639.0991-.812a6.9938,6.9938,0,0,1,13.8838,0l.0986.812.8154.0639A4.4975,4.4975,0,0,1,23.5,20H23v2h.5A6.4974,6.4974,0,0,0,24.8008,9.1362Z" /></svg>
