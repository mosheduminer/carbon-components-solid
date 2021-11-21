import type { JSX } from "solid-js";
export const NotSent16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 28.59L3.41 2 2 3.41l8 8L2.66 14.06a1 1 0 000 1.87l9.6 3.84 3.84 9.6A1 1 0 0017 30h0a1 1 0 00.92-.66L20.6 22l8 8zM5.8 15L11.54 13l3.05 3-1.83 1.83zM17 26.2l-2.79-7L16 17.41l3 3.05zM15.69 11.45l7.64-2.78-2.78 7.64 1.56 1.56L25.94 7.34a1 1 0 00-1.28-1.28L14.13 9.89z" /></svg>
