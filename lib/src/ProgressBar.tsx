import { settings } from "carbon-components";
import { Component } from "solid-js";
import { uniqueId } from "./internal/id";

const { prefix } = settings;

export type ProgressBarProps = {
  class?: string;
  hideLabel?: boolean;
  label: string;
  max: number;
  value: number;
  helperText?: string;
};

export const ProgressBar: Component<ProgressBarProps> = (props) => {
  const labelId = uniqueId("progress-bar");
  const helperId = uniqueId("progress-bar-helper");

  const indeterminate = () => props.value === null || props.value === undefined;

  const cappedValue = () => {
    let val = props.value;
    if (val > props.max) {
      val = props.max;
    }
    if (val < 0) {
      val = 0;
    }
    return val;
  };

  const percentage = () => cappedValue() / props.max;

  return (
    <div
      class={`${prefix}--progress-bar`}
      classList={{
        [`${prefix}--progress-bar--indeterminate`]: indeterminate(),
        [props.class!]: !!props.class,
      }}
    >
      <span
        class={`${prefix}--progress-bar__label`}
        classList={{
          [`${prefix}--visually-hidden`]: props.hideLabel,
        }}
        id={labelId}
      >
        {props.label}
      </span>
      <div
        class={`${prefix}--progress-bar__track`}
        role="progressbar"
        aria-labelledby={labelId}
        aria-describedby={props.helperText ? helperId : undefined}
        aria-valuemin={!indeterminate() ? 0 : undefined}
        aria-valuemax={!indeterminate() ? props.max : undefined}
        aria-valuenow={!indeterminate() ? cappedValue() : undefined}
      >
        <div
          class={`${prefix}--progress-bar__bar`}
          style={{ transform: `scaleX(${percentage()})` }}
        />
      </div>
      {props.helperText && (
        <div id={helperId} class={`${prefix}--progress-bar__helper-text`}>
          {props.helperText}
        </div>
      )}
    </div>
  );
};
