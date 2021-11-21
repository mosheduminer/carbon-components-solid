import type { JSX } from "solid-js";
export const HeatMap32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M20 18H22V20H20zM28 16H30V18H28zM14 6H16V8H14zM16 22H12V16a2.0023 2.0023 0 00-2-2H4a2.0023 2.0023 0 00-2 2v6a2.0023 2.0023 0 002 2h6v4a2.0023 2.0023 0 002 2h4a2.0023 2.0023 0 002-2V24A2.0023 2.0023 0 0016 22zM4 22V16h6v6zm8 6V24h4v4zM28 30H24a2.0021 2.0021 0 01-2-2V24a2.0021 2.0021 0 012-2h4a2.0021 2.0021 0 012 2v4A2.0021 2.0021 0 0128 30zm-4-6v4h4V24zM28 2H22a2.0023 2.0023 0 00-2 2v6H18a2.0023 2.0023 0 00-2 2v2a2.0023 2.0023 0 002 2h2a2.0023 2.0023 0 002-2V12h6a2.0023 2.0023 0 002-2V4A2.0023 2.0023 0 0028 2zM18 14V12h2v2zm4-4V4h6v6zM8 10H4A2.0021 2.0021 0 012 8V4A2.0021 2.0021 0 014 2H8a2.0021 2.0021 0 012 2V8A2.0021 2.0021 0 018 10zM4 4V8H8V4z" /></svg>
