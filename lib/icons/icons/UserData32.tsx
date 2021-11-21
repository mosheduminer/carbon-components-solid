import type { JSX } from "solid-js";
export const UserData32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M28 8H30V16H28zM23 5H25V16H23zM18 10H20V16H18zM16 30H14V24a3.0033 3.0033 0 00-3-3H7a3.0033 3.0033 0 00-3 3v6H2V24a5.0059 5.0059 0 015-5h4a5.0059 5.0059 0 015 5zM9 9a3 3 0 11-3 3A3 3 0 019 9M9 7a5 5 0 105 5A5 5 0 009 7z" /></svg>
