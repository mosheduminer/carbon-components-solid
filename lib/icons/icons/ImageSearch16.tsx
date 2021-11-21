import type { JSX } from "solid-js";
export const ImageSearch16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M24 14a5.99 5.99 0 00-4.885 9.4712L14 28.5859 15.4141 30l5.1147-5.1147A5.9971 5.9971 0 1024 14zm0 10a4 4 0 114-4A4.0045 4.0045 0 0124 24zM17 12a3 3 0 10-3-3A3.0033 3.0033 0 0017 12zm0-4a1 1 0 11-1 1A1.0009 1.0009 0 0117 8z" /><path d="M12,24H4V17.9966L9,13l5.5859,5.5859L16,17.168l-5.5859-5.5855a2,2,0,0,0-2.8282,0L4,15.168V4H24v6h2V4a2.0023,2.0023,0,0,0-2-2H4A2.002,2.002,0,0,0,2,4V24a2.0023,2.0023,0,0,0,2,2h8Z" /></svg>
