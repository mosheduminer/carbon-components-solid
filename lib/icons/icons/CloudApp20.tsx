import type { JSX } from "solid-js";
export const CloudApp20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M25.8289 13.1155A10.02 10.02 0 0016 5.0005V7a8.0233 8.0233 0 017.8649 6.4934l.2591 1.346 1.3488.2441A5.5019 5.5019 0 0124.5076 26H16v2h8.5076a7.5019 7.5019 0 001.3213-14.8845zM8 24H14V26H8zM4 24H6V26H4zM6 20H14V22H6zM2 20H4V22H2zM8 16H14V18H8zM4 16H6V18H4zM10 12H14V14H10zM6 12H8V14H6zM12 8H14V10H12z" /></svg>
