import type { JSX } from "solid-js";
export const CharacterFraction20 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="20" height="20"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28,30H20V24a2.002,2.002,0,0,1,2-2h4V18H20V16h6a2.0023,2.0023,0,0,1,2,2v4a2.0023,2.0023,0,0,1-2,2H22v4h6Z" /><path d="M4.479 15.5H26.521V17.5H4.479z" transform="rotate(-45 15.5 16.5)" /><path d="M4.5 15.5L4.5 14.5 7.5 14.5 7.5 3.5 4.5 3.5 4.5 2.5 8.5 2.5 8.5 14.5 11.5 14.5 11.5 15.5 4.5 15.5z" /><path d="M8,3V15H8V3M9,2H4V4H7V14H4v2h8V14H9V2Z" /></svg>