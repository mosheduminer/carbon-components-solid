import type { JSX } from "solid-js";
export const ShowDataCards32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28 10H4A2.0022 2.0022 0 012 8V4A2.0021 2.0021 0 014 2H28a2.0021 2.0021 0 012 2V8A2.0022 2.0022 0 0128 10zM4 4V8H28V4zM28 30H4a2.0022 2.0022 0 01-2-2V24a2.0021 2.0021 0 012-2H28a2.0021 2.0021 0 012 2v4A2.0022 2.0022 0 0128 30zM4 24v4H28V24zM28 20H4a2.0022 2.0022 0 01-2-2V14a2.0021 2.0021 0 012-2H28a2.0021 2.0021 0 012 2v4A2.0022 2.0022 0 0128 20zM4 14v4H28V14z" /></svg>