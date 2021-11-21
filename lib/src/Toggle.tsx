import { Component, JSX, mergeProps, splitProps } from "solid-js";
import keys from "./internal/keyboard/keys";
import { match } from "./internal/keyboard/match";

import settings from "carbon-components/es/globals/js/settings";
import { createId } from "./internal/id";

const { prefix } = settings;

export type ToggleProps = {
  "aria-label"?: string;
  class: string;
  defaultToggled?: boolean;
  id: string;
  labelA?: JSX.Element;
  labelB?: JSX.Element;
  labelText?: JSX.Element;
  onInput?: JSX.EventHandler<HTMLInputElement, Event>;
  onToggle?: (checked: boolean, id: string, event: Event) => any;
  size?: "sm" | "md";
  toggled?: boolean;
} & JSX.HTMLAttributes<HTMLInputElement>;

export const Toggle: Component<ToggleProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLInputElement>;
  [props, rest] = splitProps(props, [
    "aria-label",
    "children",
    "class",
    "defaultToggled",
    "id",
    "labelA",
    "labelB",
    "labelText",
    "onInput",
    "onToggle",
    "size",
    "toggled",
  ]);
  props = mergeProps(
    {
      defaultToggled: false,
      ["aria-label"]: "Toggle",
      labelA: "Off",
      labelB: "On",
      onToggle: () => {},
      id: createId(),
    },
    props
  );
  let inputRef!: HTMLInputElement;
  return (
    <div class={`${prefix}--form-item`} classList={{[props.class!]: !!props.class}}>
      {/*
      // @ts-ignore */}
      <input defaultChecked={props.defaultToggled}
        {...rest}
        aria-label={undefined}
        type="checkbox"
        id={props.id}
        class={`${prefix}--toggle-input`}
        classList={{[`${prefix}--toggle-input--small`]: !!props.size}}
        checked={props.toggled}
        onInput={(evt) => {
          props.onInput && props.onInput(evt);
          props.onToggle!(inputRef.checked, props.id, evt);
        }}
        ref={inputRef}
        onKeyUp={(evt) => {
          if (match(evt, keys.Enter)) {
            inputRef.checked = !inputRef.checked;
            props.onInput && props.onInput(evt);
            props.onToggle!(inputRef.checked, props.id, evt);
          }
        }}
      />
      <label
        class={`${prefix}--toggle-input__label`}
        for={props.id}
        aria-label={
          typeof props.labelText === "string" ? undefined : props["aria-label"]
        }
      >
        {props.labelText}
        <span class={`${prefix}--toggle__switch`}>
          {props.size && (
            <svg
              class={`${prefix}--toggle__check`}
              width="6px"
              height="5px"
              viewBox="0 0 6 5"
            >
              <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
            </svg>
          )}
          <span class={`${prefix}--toggle__text--off`} aria-hidden="true">
            {props.labelA}
          </span>
          <span class={`${prefix}--toggle__text--on`} aria-hidden="true">
            {props.labelB}
          </span>
        </span>
      </label>
    </div>
  );
};
