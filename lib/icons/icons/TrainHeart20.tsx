import type { JSX } from "solid-js";
export const TrainHeart20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M27.303 2a2.6613 2.6613 0 00-1.9079.8059l-.3932.4053-.397-.4053a2.6612 2.6612 0 00-3.8157 0 2.7991 2.7991 0 000 3.8963L25.0019 11l4.2089-4.2978a2.7991 2.7991 0 000-3.8963A2.6613 2.6613 0 0027.303 2zM22 13v3H6V10h9V8H6.1843A2.9948 2.9948 0 019 6h6V4H9A5.0057 5.0057 0 004 9V21a4.99 4.99 0 003.582 4.77L5.7693 30H7.9451l1.7143-4h8.6812l1.7143 4h2.1758L20.418 25.77A4.99 4.99 0 0024 21V13zm0 7H19v2h2.8157A2.9948 2.9948 0 0119 24H9a2.9948 2.9948 0 01-2.8157-2H9V20H6V18H22z" /></svg>
