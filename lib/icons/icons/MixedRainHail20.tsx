import type { JSX } from "solid-js";
export const MixedRainHail20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><circle cx="24.5" cy="25.5" r="1.5" /><circle cx="21.5" cy="29.5" r="1.5" /><path d="M15.868 30.496L14.132 29.504 17.276 24 11.277 24 16.132 15.504 17.868 16.496 14.723 22 20.724 22 15.868 30.496z" /><path d="M9 32a1 1 0 01-.8944-1.4474l2-4.0005a1 1 0 111.7888.8947l-2 4A.9981.9981 0 019 32zM24.8008 9.1362a8.9943 8.9943 0 00-17.6006 0 6.4929 6.4929 0 00.23 12.7681L6.106 24.5527a1 1 0 101.7885.8946l2-4a1 1 0 00-.447-1.3418A.9786.9786 0 009 20.01V20H8.5a4.4975 4.4975 0 01-.356-8.981l.8155-.0639.0991-.812a6.9938 6.9938 0 0113.8838 0l.0986.812.8154.0639A4.4975 4.4975 0 0123.5 20H23v2h.5A6.4974 6.4974 0 0024.8008 9.1362z" /></svg>
