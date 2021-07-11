import {
  Component,
  Switch,
  Match,
  JSX,
  mergeProps,
  splitProps,
} from "solid-js";
import { settings } from "carbon-components";
import { WarningFilled } from "./icons/16";
import { WarningAltFilled, Calendar } from "./icons/32";

const { prefix } = settings;

export type DatePickerInputProps = {
  datePickerType?: "simple" | "single" | "range";
  disabled?: boolean;
  hideLabel?: boolean;
  iconDescription?: string;
  id: string;
  invalid?: boolean;
  invalidText: JSX.Element;
  labelText: string;
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onClick?: JSX.EventHandler<HTMLInputElement, MouseEvent>;
  openCalendar: (e: MouseEvent) => any;
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
  onClick: () => { },
  onChange: () => { },
};

export const DatePickerInput: Component<DatePickerInputProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLInputElement>;
  [props, rest] = splitProps(props, [
    "children",
    "datePickerType",
    "disabled",
    "hideLabel",
    "iconDescription",
    "id",
    "invalid",
    "invalidText",
    "labelText",
    "onChange",
    "onClick",
    "openCalendar",
    "pattern",
    "placeholder",
    "size",
    "type",
    "warn",
    "warnText",
  ]);
  props = mergeProps(datePickerInputDefaultProps, props);
  const datePickerInputProps = () => ({
    id: props.id,
    onChange: (
      evt: Event & { currentTarget: HTMLInputElement; target: Element }
    ) => {
      if (!props.disabled) {
        props.onChange && props.onChange(evt);
      }
    },
    onClick: (
      evt: MouseEvent & { currentTarget: HTMLInputElement; target: Element }
    ) => {
      if (!props.disabled) {
        props.onClick && props.onClick(evt);
      }
    },
    placeholder: props.placeholder,
    type: props.type,
    pattern: props.pattern,
  });
  const error = () => {
    if (props.invalid) {
      return (
        <div className={`${prefix}--form-requirement`}>{props.invalidText}</div>
      );
    } else if (props.warn) {
      return (
        <div className={`${prefix}--form-requirement`}>{props.warnText}</div>
      );
    }
  };
  const inputClasses = () => ({
    [`${prefix}--date-picker__input--${props.size}`]: !!props.size,
    [`${prefix}--date-picker__input--invalid`]: props.invalid,
  });
  return (
    <div classList={{
      [`${prefix}--date-picker--nolabel`]: !props.labelText,
    }} class={`${prefix}--date-picker-container`}>
      {props.labelText ? (
        <label for={props.id} classList={{
          [`${prefix}--visually-hidden`]: props.hideLabel,
          [`${prefix}--label--disabled`]: props.disabled,
        }} class={`${prefix}--label`}>
          {props.labelText}
        </label>
      ) : undefined}
      <div classList={{
        [`${prefix}--date-picker-input__wrapper--invalid`]: props.invalid,
        [`${prefix}--date-picker-input__wrapper--warn`]: props.warn,
      }} class={`${prefix}--date-picker-input__wrapper`}>
        {props.invalid ? (
          <input
            {...rest}
            {...datePickerInputProps()}
            disabled={props.disabled}
            data-invalid
            classList={inputClasses()}
            class={`${prefix}--date-picker__input`}
          />
        ) : (
          <input
            {...rest}
            {...datePickerInputProps}
            disabled={props.disabled}
            class={`${prefix}--date-picker__input`}
            classList={inputClasses()}
          />
        )}
        <Switch
          fallback={
            <Calendar
              className={`${prefix}--date-picker__icon`}
              aria-label={props.iconDescription}
              onClick={props.openCalendar}
              role="img"
            >
              {props.iconDescription && <title>{props.iconDescription}</title>}
            </Calendar>
          }
        >
          <Match
            when={
              props.datePickerType === "simple" && !props.invalid && !props.warn
            }
          >
            {undefined}
          </Match>
          <Match when={props.invalid}>
            <WarningFilled
              class={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--invalid`}
            />
          </Match>
          <Match when={!props.invalid && props.warn}>
            <WarningAltFilled
              class={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--warn`}
            />
          </Match>
        </Switch>
      </div>
      {error()}
    </div>
  );
};
