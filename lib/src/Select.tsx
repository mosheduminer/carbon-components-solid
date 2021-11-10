import { Component, splitProps, JSX, mergeProps, createMemo } from "solid-js";
import { settings } from "carbon-components";
import { ChevronDown, WarningFilled } from "./icons/16";
import { WarningAltFilled } from "./icons/32";

const { prefix } = settings;

export type SelectProps = {
  class?: string;
  defaultValue?: any;
  disabled?: boolean;
  helperText?: JSX.Element;
  hideLabel?: boolean;
  id: string;
  inline?: boolean;
  invalid?: boolean;
  invalidText?: JSX.Element;
  labelText?: JSX.Element;
  light?: boolean;
  noLabel?: boolean;
  onChange?: Function;
  size?: "sm" | "md" | "lg";
  warn?: boolean;
  warnText?: JSX.Element;
  ref?: HTMLSelectElement;
} & JSX.HTMLAttributes<HTMLSelectElement>;

export const Select: Component<SelectProps> = (props) => {
  let other: JSX.HTMLAttributes<HTMLSelectElement>;
  [props, other] = splitProps(props, [
    "class",
    "id",
    "inline",
    "labelText",
    "disabled",
    "children",
    "noLabel",
    "hideLabel",
    "invalid",
    "invalidText",
    "onChange",
    "helperText",
    "light",
    "size",
    "warn",
    "warnText",
    "ref",
  ]);
  props = mergeProps(
    {
      disabled: false,
      labelText: "Select",
      inline: false,
      invalid: false,
      invalidText: "",
      helperText: "",
      light: false,
    },
    props
  );

  const errorId = `${props.id}-error-msg`;
  const error = createMemo(() => {
    const errorText = (() => {
      if (props.invalid) {
        return props.invalidText;
      }
      if (props.warn) {
        return props.warnText;
      }
    })();
    return props.invalid || props.warn ? (
      <div className={`${prefix}--form-requirement`} id={errorId}>
        {errorText}
      </div>
    ) : null;
  });
  const helper = () =>
    props.helperText ? (
      <div
        class={`${prefix}--form__helper-text`}
        classList={{
          [`${prefix}--form__helper-text--disabled`]: props.disabled,
        }}
      >
        {props.helperText}
      </div>
    ) : null;
  const ariaProps = () => {
    if (props.invalid) {
      return { "aria-describedby": errorId };
    }
    return {};
  };
  const input = (() => {
    return (
      <>
        <select
          {...other}
          {...ariaProps}
          id={props.id}
          class={`${prefix}--select-input`}
          classList={{
            [`${prefix}--select-input--${props.size}`]: !!props.size,
          }}
          disabled={props.disabled || undefined}
          aria-invalid={props.invalid || undefined}
          ref={props.ref}
        >
          {props.children}
        </select>
        <ChevronDown className={`${prefix}--select__arrow`} />
        {props.invalid && (
          <WarningFilled className={`${prefix}--select__invalid-icon`} />
        )}
        {!props.invalid && props.warn && (
          <WarningAltFilled
            className={`${prefix}--select__invalid-icon ${prefix}--select__invalid-icon--warning`}
          />
        )}
      </>
    );
  })();

  return (
    <div
      class={`${prefix}--form-item`}
      classList={{ [props.class!]: !!props.class }}
    >
      <div
        class={`${prefix}--select`}
        classList={{
          [`${prefix}--select--inline`]: props.inline,
          [`${prefix}--select--light`]: props.light,
          [`${prefix}--select--invalid`]: props.invalid,
          [`${prefix}--select--disabled`]: props.disabled,
          [`${prefix}--select--warning`]: props.warn,
        }}
      >
        {!props.noLabel && (
          <label
            htmlFor={props.id}
            class={`${prefix}--label`}
            classList={{
              [`${prefix}--visually-hidden`]: props.hideLabel,
              [`${prefix}--label--disabled`]: props.disabled,
            }}
          >
            {props.labelText}
          </label>
        )}
        {props.inline && (
          <div className={`${prefix}--select-input--inline__wrapper`}>
            <div
              className={`${prefix}--select-input__wrapper`}
              data-invalid={props.invalid || null}
            >
              {input}
            </div>
            {error()}
          </div>
        )}
        {!props.inline && (
          <div
            className={`${prefix}--select-input__wrapper`}
            data-invalid={props.invalid || null}
          >
            {input}
          </div>
        )}
        {!props.inline && error() ? error() : helper}
      </div>
    </div>
  );
};
