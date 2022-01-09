/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Accessor, createEffect, createMemo, createSignal, untrack } from 'solid-js';
import type { Setter } from "solid-js";
import { warning } from './warning';

/**
 * This custom hook simplifies the behavior of a component if it has state that
 * can be both controlled and uncontrolled. It functions identical to a
 * useState() hook and provides [state, setState] for you to use. You can use
 * the `onChange` argument to allow updates to the `state` to be communicated to
 * owners of controlled components.
 *
 * Note: this hook will warn if a component is switching from controlled to
 * uncontrolled, or vice-verse.
 *
 * @param {object} config
 * @param {string} config.name - the name of the custom component
 * @param {any} config.defaultValue - the default value used for the state. This will be
 * the fallback value used if `value` is not defined.
 * @param {Function} config.onChange - an optional function that is called when
 * the value of the state changes. This is useful for communicating to parents of
 * controlled components that the value is requesting to be changed.
 * @param {any} config.value - a controlled value. Omitting this means that the state is
 * uncontrolled
 * @returns {[any, Function]}
 */
export function useControllableState<T>({
  defaultValue,
  name = () => 'custom',
  onChange,
  value,
}: {
  defaultValue: T;
  name?: () => string;
  onChange: (arg: T) => any;
  value: Accessor<T | undefined>;
}): [Accessor<T>, Setter<T>] {
  value = createMemo(value);
  const [signal, internalSetSignal] = createSignal<T>(value() ?? defaultValue);
  let controlled: boolean | null = null;

  if (controlled === null) {
    controlled = value() !== undefined;
  }

  function setState(stateOrUpdater: T | ((arg: T) => T)) {
    const value: T =
      typeof stateOrUpdater === "function"
        //@ts-ignore
        ? stateOrUpdater(untrack(signal))
        : stateOrUpdater;

    if (controlled === false) {
      //@ts-ignore
      internalSetSignal(value);
    }

    if (onChange) {
      onChange(value);
    }
  }

  createEffect(() => {
    const controlledValue = value() !== undefined;

    // Uncontrolled -> Controlled
    // If the component prop is uncontrolled, the prop value should be undefined
    if (controlled === false && controlledValue) {
      warning(
        false,
        'A component is changing an uncontrolled %s component to be controlled. ' +
        'This is likely caused by the value changing to a defined value ' +
        'from undefined. Decide between using a controlled or uncontrolled ' +
        'value for the lifetime of the component. ' +
        'More info: https://reactjs.org/link/controlled-components',
        name()
      );
    }

    // Controlled -> Uncontrolled
    // If the component prop is controlled, the prop value should be defined
    if (controlled === true && !controlledValue) {
      warning(
        false,
        'A component is changing a controlled %s component to be uncontrolled. ' +
        'This is likely caused by the value changing to an undefined value ' +
        'from a defined one. Decide between using a controlled or ' +
        'uncontrolled value for the lifetime of the component. ' +
        'More info: https://reactjs.org/link/controlled-components',
        name()
      );
    }
  });

  if (controlled === true) {
    //@ts-ignore
    return [value, setState];
  }

  //@ts-ignore
  return [signal, setState];
}