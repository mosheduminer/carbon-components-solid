import type { JSX } from "solid-js";
export const TextHighlight16 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="16" height="16"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M12 15H5a3 3 0 01-3-3V10A3 3 0 015 7h5V5A1 1 0 009 4H3V2H9a3 3 0 013 3zM5 9a1 1 0 00-1 1v2a1 1 0 001 1h5V9zM20 23v2a1 1 0 001 1h5V22H21A1 1 0 0020 23z" /><path d="M2,30H30V2Zm26-2H21a3,3,0,0,1-3-3V23a3,3,0,0,1,3-3h5V18a1,1,0,0,0-1-1H19V15h6a3,3,0,0,1,3,3Z" /></svg>