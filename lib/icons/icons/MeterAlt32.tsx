import type { JSX } from "solid-js";
export const MeterAlt32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 20a13.8535 13.8535 0 00-2.2291-7.5288l-1.4452 1.4453A11.8917 11.8917 0 0128 20zM28 9.414L26.5859 8 18.019 16.5669A3.9521 3.9521 0 0016 16a4 4 0 104 4 3.9533 3.9533 0 00-.5669-2.0191zM16 22a2 2 0 112-2A2.0023 2.0023 0 0116 22zM16 8a11.9086 11.9086 0 016.0833 1.6743l1.4536-1.4536A13.9773 13.9773 0 002 20H4A12.0137 12.0137 0 0116 8z" /></svg>
