import {
  Component,
  createEffect,
  JSX,
  mergeProps,
  Show,
  splitProps,
  useContext,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { useNormalizedInputProps } from "./internal/useNormalizedInputProps";
import { usePrefix } from "./internal/usePrefix";
import { callEventHandlerUnion } from "./internal/callEventHandlerUnion";
import { useFormContext } from "./FluidForm";

const invalidProps = (invalidId: string) => ({
  "data-invalid": true,
  "aria-invalid": true,
  "aria-describedby": invalidId,
});

const warnProps = (warnId: string) => ({
  "aria-describedby": warnId,
});

export const textInputProps = ({
  sharedTextInputProps,
  invalid,
  invalidId,
  warn,
  warnId,
}: {
  sharedTextInputProps: object;
  invalid: boolean | undefined;
  invalidId: string;
  warn: boolean | undefined;
  warnId: string;
}) => ({
  ...sharedTextInputProps,
  ...(invalid ? invalidProps(invalidId) : {}),
  ...(warn ? warnProps(warnId) : {}),
});

type TextInputProps = {
  class?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  helperText?: JSX.Element;
  hideLabel?: boolean;
  id: string;
  inline?: boolean;
  invalid?: boolean;
  invalidText?: JSX.Element;
  labelText: JSX.Element;
  light?: boolean;
  onInput?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
  onClick?: JSX.EventHandlerUnion<HTMLInputElement, MouseEvent>;
  placeholder?: string;
  readOnly?: boolean;
  ref?: HTMLInputElement;
  size?: "sm" | "md" | "lg";
  type?: string;
  value?: string | number;
  warn?: boolean;
  warnText?: JSX.Element;
} & JSX.HTMLAttributes<HTMLInputElement>;

export const TextInput: Component<TextInputProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLInputElement>;
  [props, rest] = splitProps(props, [
    "children",
    "class",
    "defaultValue",
    "disabled",
    "helperText",
    "hideLabel",
    "id",
    "inline",
    "invalid",
    "invalidText",
    "labelText",
    "light",
    "onClick",
    "onInput",
    "placeholder",
    "readOnly",
    "ref",
    "size",
    "type",
    "value",
    "warn",
    "warnText",
  ]);
  props = mergeProps(
    {
      disabled: false,
      type: "text",
      onInput: () => { },
      onClick: () => { },
      invalid: false,
      invalidText: "",
      warn: false,
      warnText: "",
      helperText: "",
      light: false,
      inline: false,
    },
    props
  );
  const prefix = usePrefix();
  const normalizedProps = useNormalizedInputProps(props);
  const customClassName = () => props.class ?? `${prefix}--text__input`;
  const textInputClasses = () => ({
    [`${prefix}--text-input`]: true,
    [props.class!]: !!props.class,
    [customClassName()]: true,
    [`${prefix}--text-input--light`]: props.light,
    [`${prefix}--text-input--invalid`]: normalizedProps().invalid,
    [`${prefix}--text-input--warning`]: normalizedProps().warn,
    [`${prefix}--text-input--${props.size}`]: props.size,
  });
  const sharedTextInputProps = () => ({
    id: props.id,
    onInput: (
      evt: InputEvent & { currentTarget: HTMLInputElement; target: Element }
    ) => {
      if (!normalizedProps().disabled) {
        callEventHandlerUnion(props.onInput, evt);
      }
    },
    onClick: (
      evt: MouseEvent & { currentTarget: HTMLInputElement; target: Element }
    ) => {
      if (!normalizedProps().disabled) {
        callEventHandlerUnion(props.onClick, evt);
      }
    },
    placeholder: props.placeholder,
    type: props.type,
    ref: props.ref,
    classList: textInputClasses(),
    title: props.placeholder,
    disabled: normalizedProps().disabled,
    readOnly: props.readOnly,
    ["aria-describedby"]: normalizedProps().helperId,
    ...rest,
  });

  const label = (
    <Show when={props.labelText}>
      <label
        for={props.id}
        class={`${prefix}--label`}
        classList={{
          [`${prefix}--visually-hidden`]: props.hideLabel,
          [`${prefix}--label--disabled`]: normalizedProps().disabled,
          [`${prefix}--label--inline`]: props.inline,
          [`${prefix}--label--inline--${props.size}`]:
            props.inline && !!props.size,
        }}
      >
        {props.labelText}
      </label>
    </Show>
  );

  const helper = (
    <Show when={props.helperText}>
      <div
        id={normalizedProps().helperId}
        class={`${prefix}--form__helper-text`}
        classList={{
          [`${prefix}--form__helper-text--disabled`]:
            normalizedProps().disabled,
          [`${prefix}--form__helper-text--inline`]: props.inline,
        }}
      >
        {props.helperText}
      </div>
    </Show>
  );

  const { isFluid } = useFormContext;

  return (
    <div
      class={`${prefix}--text-input-wrapper ${prefix}--form-item`}
      classList={{
        [`${prefix}--text-input-wrapper--readonly`]: props.readOnly,
        [`${prefix}--text-input-wrapper--light`]: props.light,
        [`${prefix}--text-input-wrapper--inline`]: props.inline,
      }}
    >
      {!props.inline ? (
        label
      ) : (
        <div class={`${prefix}--text-input__label-helper-wrapper`}>
          {label}
          {!isFluid && helper}
        </div>
      )}
      <div
        classList={{
          [`${prefix}--text-input__field-outer-wrapper--inline`]: props.inline,
        }}
        class={`${prefix}--text-input__field-outer-wrapper`}
      >
        <div
          class={`${prefix}--text-input__field-wrapper`}
          classList={{
            [`${prefix}--text-input__field-wrapper--warning`]:
              normalizedProps().warn,
          }}
          data-invalid={normalizedProps().invalid || null}
        >
          <Dynamic
            component={normalizedProps().icon}
            //@ts-ignore
            classList={{
              [`${prefix}--text-input__invalid-icon`]:
                normalizedProps().invalid || normalizedProps().warn,
              [`${prefix}--text-input__invalid-icon--warning`]:
                normalizedProps().warn,
              [`${prefix}--text-input__readonly-icon`]: props.readOnly,
            }}
          />
          <input
            {...textInputProps({
              sharedTextInputProps: sharedTextInputProps(),
              invalid: normalizedProps().invalid,
              invalidId: normalizedProps().invalidId,
              warn: normalizedProps().warn,
              warnId: normalizedProps().warnId,
            })}
          />
          {isFluid && <hr class={`${prefix}--text-input__divider`} />}
          {isFluid && !props.inline && normalizedProps().validation}
        </div>
        {!isFluid && !props.inline && (normalizedProps().validation || helper)}
      </div>
    </div>
  );
};
