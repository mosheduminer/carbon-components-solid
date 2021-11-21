import type { JSX } from "solid-js";
export const ChatLaunch20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M12 22H4V8H16V6H4A2 2 0 002 8V22a2 2 0 002 2h8zM22 13.414L28 7.414 28 12 30 12 30 4 22 4 22 6 26.586 6 20.586 12 22 13.414zM13.4953 30l-1.6-1.2L17 22h7V16h2v6a2.0023 2.0023 0 01-2 2H18z" /></svg>
