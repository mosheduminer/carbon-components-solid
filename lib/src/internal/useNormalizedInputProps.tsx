/**
 * Modified from https://github.com/carbon-design-system/carbon/blob/e7b27cf0b047a7b991bb01a5fec3160facd9299a/packages/react/src/internal/useNormalizedInputProps.js
 */

import { Component, createMemo, JSX } from "solid-js";
import { WarningFilled } from "../icons/16";
import { EditOff, WarningAltFilled } from "../icons/32";
import { settings } from "carbon-components";

const { prefix } = settings;

export function useNormalizedInputProps(props: {
  id: string;
  readOnly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  invalidText?: JSX.Element;
  warn?: boolean;
  warnText?: JSX.Element;
}) {
  return createMemo(() => {
    const normalizedProps: {
      disabled: boolean | undefined;
      invalid: boolean | undefined;
      invalidId: string;
      warn: boolean | undefined;
      warnId: string;
      validation: JSX.Element;
      icon: Component | undefined;
      helperId: string;
    } = {
      disabled: !props.readOnly && props.disabled,
      invalid: !props.readOnly && props.invalid,
      invalidId: `${props.id}-error-msg`,
      warn: !props.readOnly && !props.invalid && props.warn,
      warnId: `${props.id}-warn-msg`,
      validation: undefined,
      icon: undefined,
      helperId: `${props.id}-helper-text`,
    };

    if (props.readOnly) {
      normalizedProps.icon = EditOff;
    } else {
      if (normalizedProps.invalid) {
        normalizedProps.icon = WarningFilled;
        normalizedProps.validation = (
          <div
            className={`${prefix}--form-requirement`}
            id={normalizedProps.invalidId}
          >
            {props.invalidText}
          </div>
        );
      } else if (normalizedProps.warn) {
        normalizedProps.icon = WarningAltFilled;
        normalizedProps.validation = (
          <div
            className={`${prefix}--form-requirement`}
            id={normalizedProps.warnId}
          >
            {props.warnText}
          </div>
        );
      }
    }

    return normalizedProps;
  });
}
