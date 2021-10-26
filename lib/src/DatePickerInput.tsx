import { Component, JSX, mergeProps } from "solid-js";

export type DatePickerInputProps = {
  datePickerType?: "simple" | "single" | "range";
  disabled?: boolean;
  hideLabel?: boolean;
  iconDescription?: string;
  id?: string;
  invalid?: boolean;
  invalidText?: JSX.Element;
  labelText?: string;
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onClick?: JSX.EventHandler<HTMLInputElement, MouseEvent>;
  openCalendar?: (e: MouseEvent) => any;
  pattern?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  type?: string;
  warn?: boolean;
  warnText?: JSX.Element;
} & JSX.HTMLAttributes<HTMLInputElement>;

const datePickerInputDefaultProps = {
  pattern: "\\d{1,2}\\/\\d{1,2}\\/\\d{4}",
  type: "text",
  disabled: false,
  invalid: false,
  onClick: () => {},
  onChange: () => {},
};

export const DatePickerInput: Component<DatePickerInputProps> = (props) => {
  props = mergeProps(datePickerInputDefaultProps, props);
  return props as unknown as JSX.Element;
};
