import type { JSX } from "solid-js";
export const SkillLevelBasic32 = (props: JSX.HTMLAttributes<SVGSVGElement> & {iconTitle?: string; description?: string;}) => <svg {...props} aria-label={props.description}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" width="32" height="32"><title>{typeof props.iconTitle === "undefined" ? props.description : props.iconTitle}</title><path d="M30 30H22V4h8zm-6-2h4V6H24zM20 30H12V12h8zm-6-2h4V14H14zM10 30H2V18h8z" /></svg>
