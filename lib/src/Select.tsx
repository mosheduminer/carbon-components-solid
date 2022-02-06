import { Component, splitProps, JSX, mergeProps, createMemo } from "solid-js";
import { settings } from "carbon-components";
import { WarningFilled16 } from "./icons/WarningFilled16";
import { WarningAltFilled16 } from "./icons/WarningAltFilled16";
import { ChevronDown16 } from "./icons/ChevronDown16";

const { prefix } = settings;

export type SelectProps = {
  class?: string;
  value?: any;
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
  size?: "sm" | "md" | "lg";
  warn?: boolean;
  warnText?: JSX.Element;
  ref?: HTMLSelectElement;
} & JSX.SelectHTMLAttributes<HTMLSelectElement>;

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
      <div class={`${prefix}--form-requirement`} id={errorId}>
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
        <ChevronDown16 class={`${prefix}--select__arrow`} />
        {props.invalid && (
          <WarningFilled16 class={`${prefix}--select__invalid-icon`} />
        )}
        {!props.invalid && props.warn && (
          <WarningAltFilled16
            class={`${prefix}--select__invalid-icon ${prefix}--select__invalid-icon--warning`}
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
            for={props.id}
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
          <div class={`${prefix}--select-input--inline__wrapper`}>
            <div
              class={`${prefix}--select-input__wrapper`}
              data-invalid={props.invalid || null}
            >
              {input}
            </div>
            {error()}
          </div>
        )}
        {!props.inline && (
          <div
            class={`${prefix}--select-input__wrapper`}
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
