import { throttle } from "lodash-es";
import {
  batch,
  Component,
  createEffect,
  createSignal,
  JSX,
  JSXElement,
  mergeProps,
  on,
  onMount,
  splitProps,
} from "solid-js";
import keys from "./internal/keyboard/keys";
import { matches } from "./internal/keyboard/match";
import { usePrefix } from "./internal/usePrefix";

const defaultFormatLabel = (
  value: number,
  label: string | ((arg: number) => string)
) => {
  return typeof label === "function" ? label(value) : `${value}${label}`;
};

/**
 * Minimum time between processed "drag" events.
 */
const EVENT_THROTTLE = 16; // ms

/**
 * Event types that trigger "drags".
 */
const DRAG_EVENT_TYPES = new Set(["mousemove", "touchmove"]);

/**
 * Event types that trigger a "drag" to stop.
 */
const DRAG_STOP_EVENT_TYPES = new Set(["mouseup", "touchend", "touchcancel"]);

export type SliderProps = {
  /**
   * The `ariaLabel` for the `<input>`.
   */
  ariaLabelInput?: string;

  /**
   * The child nodes.
   */
  children?: JSXElement;

  /**
   * The CSS class name for the slider.
   */
  class?: string;

  /**
   * `true` to disable this slider.
   */
  disabled?: boolean;

  /**
   * The callback to format the label associated with the minimum/maximum value.
   */
  formatLabel?: Function;

  /**
   * `true` to hide the number input box.
   */
  hideTextInput?: boolean;

  /**
   * The ID of the `<input>`.
   */
  id?: string;

  /**
   * The `type` attribute of the `<input>`.
   */
  inputType?: string;

  /**
   * `true` to specify if the control is invalid.
   */
  invalid?: boolean;

  /**
   * The label for the slider.
   */
  labelText?: JSXElement;

  /**
   * The maximum value.
   */
  max: number;

  /**
   * The label associated with the maximum value.
   */
  maxLabel?: string;

  /**
   * The minimum value.
   */
  min: number;

  /**
   * The label associated with the minimum value.
   */
  minLabel?: string;

  /**
   * The `name` attribute of the `<input>`.
   */
  name?: string;

  /**
   * Provide an optional function to be called when the input element
   * loses focus
   */
  onBlur?: (arg: { value: string }) => any;

  /**
   * The callback to get notified of change in value.
   */
  onChange?: (arg: { value: number }) => any;

  /**
   * Provide an optional function to be called when a key is pressed in the number input
   */
  onInputKeyUp?: JSX.EventHandlerUnion<HTMLInputElement, KeyboardEvent>;

  /**
   * The callback to get notified of value on handle release.
   */
  onRelease?: Function;

  /**
   * `true` to specify if the control is required.
   */
  required?: boolean;

  /**
   * A value determining how much the value should increase/decrease by moving the thumb by mouse.
   */
  step?: number;

  /**
   * A value determining how much the value should increase/decrease by Shift+arrow keys,
   * which will be `(max - min) / stepMultiplier`.
   */
  stepMultiplier?: number;

  /**
   * The value.
   */
  value?: number;
};

const defaultProps = {
  hideTextInput: false,
  formatLabel: defaultFormatLabel,
  step: 1,
  stepMultiplier: 4,
  disabled: false,
  minLabel: "",
  maxLabel: "",
  inputType: "number",
  ariaLabelInput: undefined,
};

export const Slider: Component<SliderProps> = (props) => {
  const defaultInputId = `__carbon-slider_${Math.random()
    .toString(36)
    .substring(2)}`;
  props = mergeProps({ ...defaultProps, id: defaultInputId }, props);
  const [value, setValue] = createSignal<number | string | undefined>(
    props.value
  );
  const [left, setLeft] = createSignal(0);
  const [needsOnRelease, setNeedsOnRelease] = createSignal(false);
  const [isValid, setIsValid] = createSignal(true);
  let ref!: HTMLDivElement;
  /**
   * Synonymous to ECMA2017+ `Math.clamp`.
   *
   * @param {number} val
   * @param {number} min
   * @param {number} max
   *
   * @returns `val` if `max>=val>=min`; `min` if `val<min`; `max` if `val>max`.
   */
  function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(val, max));
  }

  /**
   * Sets up "drag" event handlers and calls `this.onDrag` in case dragging
   * started on somewhere other than the thumb without a corresponding "move"
   * event.
   *
   * @param {Event} evt The event.
   */
  const onDragStart = (evt: TouchEvent | MouseEvent) => {
    // Do nothing if component is disabled
    if (props.disabled) {
      return;
    }

    // Register drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      ref.ownerDocument.addEventListener(element, onDragStop);
    });

    // Register drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      //@ts-ignore
      ref.ownerDocument.addEventListener(element, onDrag);
    });

    // Perform first recalculation since we probably didn't click exactly in the
    // middle of the thumb
    onDrag(evt);
  };

  /**
   * Unregisters "drag" and "drag stop" event handlers and calls sets the flag
   * indicating that the `onRelease` callback should be called.
   */
  const onDragStop = () => {
    // Do nothing if component is disabled
    if (props.disabled) {
      return;
    }

    // Remove drag stop handlers
    DRAG_STOP_EVENT_TYPES.forEach((element) => {
      ref.ownerDocument.removeEventListener(element, onDragStop);
    });

    // Remove drag handlers
    DRAG_EVENT_TYPES.forEach((element) => {
      //@ts-ignore
      ref.ownerDocument.removeEventListener(element, onDrag);
    });

    // Set needsOnRelease flag so event fires on next update
    batch(() => {
      setNeedsOnRelease(true);
      setIsValid(true);
    });
  };

  /**
   * Handles a "drag" event by recalculating the value/thumb and setting state
   * accordingly.
   *
   * @param {Event} evt The event.
   */
  const _onDrag = (evt: TouchEvent | MouseEvent) => {
    // Do nothing if component is disabled or we have no event
    if (props.disabled || !evt) {
      return;
    }

    let clientX;
    if ("clientX" in evt) {
      //@ts-ignore
      clientX = evt.clientX;
    } else if (
      "touches" in evt &&
      0 in evt.touches &&
      "clientX" in evt.touches[0]
    ) {
      clientX = evt.touches[0].clientX;
    } else {
      // Do nothing if we have no valid clientX
      return;
    }

    const { value, left } = calcValue({ clientX });
    batch(() => {
      setValue(value || 0);
      setLeft(left);
      setIsValid(true);
    });
  };

  /**
   * Throttles calls to `this._onDrag` by limiting events to being processed at
   * most once every `EVENT_THROTTLE` milliseconds.
   */
  const onDrag = throttle(_onDrag, EVENT_THROTTLE, {
    leading: true,
    trailing: false,
  });

  /**
   * Handles a `keydown` event by recalculating the value/thumb and setting
   * state accordingly.
   *
   * @param {Event} evt The event.
   */
  const onKeyDown = (evt: KeyboardEvent) => {
    // Do nothing if component is disabled or we don't have a valid event
    if (props.disabled || !("which" in evt)) {
      return;
    }

    //@ts-ignore
    const which = Number.parseInt(evt.which);
    let delta = 0;
    if (matches(which, [keys.ArrowDown, keys.ArrowLeft])) {
      delta = -props.step!;
    } else if (matches(which, [keys.ArrowUp, keys.ArrowRight])) {
      delta = props.step!;
    } else {
      // Ignore keys we don't want to handle
      return;
    }

    // If shift was held, account for the stepMultiplier
    if (evt.shiftKey) {
      const stepMultiplier = props.stepMultiplier!;
      delta *= stepMultiplier;
    }

    Math.floor((value() as number) / props.step!) * props.step!;
    const { value: calculatedValue, left } = calcValue({
      // Ensures custom value from `<input>` won't cause skipping next stepping point with right arrow key,
      // e.g. Typing 51 in `<input>`, moving focus onto the thumb and the hitting right arrow key should yield 52 instead of 54
      value:
        (delta > 0
          ? Math.floor((value() as number) / props.step!) * props.step!
          : (value() as number)) + delta,
    });

    batch(() => {
      setValue(calculatedValue || 0);
      setLeft(left);
      setIsValid(true);
    });
  };

  /**
   * Provides the two-way binding for the input field of the Slider. It also
   * Handles a change to the input field by recalculating the value/thumb and
   * setting state accordingly.
   *
   * @param {Event} evt The event.
   */

  const onChange = (evt: Event) => {
    // Do nothing if component is disabled
    if (props.disabled) {
      return;
    }

    // Do nothing if we have no valid event, target, or value
    if (
      !evt ||
      !("target" in evt) ||
      typeof (evt.currentTarget as HTMLInputElement).value !== "string"
    ) {
      return;
    }

    let targetValue = Number.parseFloat(
      (evt.currentTarget as HTMLInputElement).value
    );

    // Avoid calling calcValue for invalid numbers, but still update the state
    if (isNaN(targetValue)) {
      setValue((evt.currentTarget as HTMLInputElement).value);
    } else {
      const { value, left } = calcValue({
        value: targetValue,
        useRawValue: true,
      });
      batch(() => {
        setValue(value || 0);
        setLeft(left);
        setNeedsOnRelease(true);
      });
    }
  };

  /**
   * Checks for validity of input value after clicking out of the input. It also
   * Handles state change to isValid state.
   *
   * @param {Event} evt The event.
   */
  const onBlur = (evt: Event) => {
    // Do nothing if we have no valid event, target, or value
    if (
      !evt ||
      !("target" in evt) ||
      typeof (evt.currentTarget as HTMLInputElement).value !== "string"
    ) {
      return;
    }

    // determine validity of input change after clicking out of input
    const validity = (evt.currentTarget as HTMLInputElement).checkValidity();
    const { value } = evt.currentTarget as HTMLInputElement;

    setIsValid(validity);
    props.onBlur?.({ value });
  };

  /**
   * Calculates a new Slider `value` and `left` (thumb offset) given a `clientX`,
   * `value`, or neither of those.
   * - If `clientX` is specified, it will be used in
   *   conjunction with the Slider's bounding rectangle to calculate the new
   *   values.
   * - If `clientX` is not specified and `value` is, it will be used to
   *   calculate new values as though it were the current value of the Slider.
   * - If neither `clientX` nor `value` are specified, `this.props.value` will
   *   be used to calculate the new values as though it were the current value
   *   of the Slider.
   *
   * @param {object} params
   * @param {number} [params.clientX] Optional clientX value expected to be from
   *   an event fired by one of the Slider's `DRAG_EVENT_TYPES` events.
   * @param {number} [params.value] Optional value use during calculations if
   *   clientX is not provided.
   * @param {boolean} [params.useRawValue=false] `true` to use the given value as-is.
   */
  const calcValue = ({
    clientX = null,
    value: passedValue = null,
    useRawValue = false,
  }: {
    clientX?: number | null;
    value?: number | null;
    useRawValue?: boolean;
  }) => {
    const range = props.max - props.min;
    const boundingRect = ref.getBoundingClientRect();
    const totalSteps = range / props.step!;
    let width = boundingRect.right - boundingRect.left;

    // Enforce a minimum width of at least 1 for calculations
    if (width <= 0) {
      width = 1;
    }

    // If a clientX is specified, use it to calculate the leftPercent. If not,
    // use the provided value or state's value to calculate it instead.
    let leftPercent;
    if (clientX != null) {
      const leftOffset = clientX - boundingRect.left;
      leftPercent = leftOffset / width;
    } else {
      if (passedValue == null) {
        passedValue = value() as number;
      }
      // prevent NaN calculation if the range is 0
      leftPercent = range === 0 ? 0 : (passedValue - props.min) / range;
    }

    if (useRawValue) {
      // Adjusts only for min/max of thumb position
      return {
        value: passedValue,
        left: Math.min(1, Math.max(0, leftPercent)) * 100,
      };
    }

    let steppedValue = Math.round(leftPercent * totalSteps) * props.step!;
    let steppedPercent = clamp(steppedValue / range, 0, 1);

    steppedValue = clamp(steppedValue + props.min, props.min, props.max);

    return { value: steppedValue, left: steppedPercent * 100 };
  };
  /**
   * Sets up initial slider position and value in response to component mount.
   */
  onMount(() => {
    const { value, left } = calcValue({
      useRawValue: true,
    });
    batch(() => {
      setValue(value || 0);
      setLeft(left);
    });
  });

  let prevState = {
    isValid: isValid(),
    needsOnRelease: needsOnRelease(),
    left: left(),
    value: value(),
    propsValue: props.value,
    propsMax: props.max,
    propsMin: props.min,
  };

  /**
   * Handles firing of `onChange` and `onRelease` callbacks to parent in
   * response to state changes.
   *
   */
  createEffect(
    on(
      () => [left(), value(), needsOnRelease(), isValid()],
      () => {
        // Fire onChange event handler if present, if there's a usable value, and
        // if the value is different from the last one
        if (
          value() !== "" &&
          prevState.value !== value() &&
          typeof props.onChange === "function"
        ) {
          props.onChange({ value: value() as number });
        }
        // Fire onRelease event handler if present and if needed
        if (needsOnRelease() && typeof props.onRelease === "function") {
          props.onRelease({ value: value() });
          setNeedsOnRelease(false);
        }
        // If value from props does not change, do nothing here.
        // Otherwise, do prop -> state sync without "value capping".
        if (
          prevState.propsValue === props.value &&
          prevState.propsMax === props.max &&
          prevState.propsMin === props.min
        ) {
          return;
        }
        batch(() => {
          const { left, value } = calcValue({
            value: props.value,
            useRawValue: true,
          });
          setValue(value || 0);
          setLeft(left);
        });
      }
    )
  );

  createEffect(() => {
    prevState = {
      ...prevState,
      isValid: isValid(),
      needsOnRelease: needsOnRelease(),
      left: left(),
      value: value(),
      propsValue: props.value,
      propsMax: props.max,
      propsMin: props.min,
    };
  });

  createEffect(() => {
    const { value, left } = calcValue({ value: props.value });
    setValue(value || 0);
    setLeft(left);
  });

  const prefix = usePrefix();

  const labelId = `${props.id}-label`;

  const [, other] = splitProps(props, [
    "ariaLabelInput",
    "class",
    "hideTextInput",
    "id",
    "min",
    "minLabel",
    "max",
    "maxLabel",
    "formatLabel",
    "labelText",
    "step",
    "stepMultiplier",
    "inputType",
    "required",
    "disabled",
    "name",
    "onRelease",
    "invalid",
    "onChange",
    "onBlur",
  ]);

  return (
    <div
      classList={{
        [`${prefix}--form-item`]: true,
        [props.class!]: !!props.class,
      }}
    >
      <label
        for={props.id}
        classList={{
          [`${prefix}--label`]: true,
          [`${prefix}--label--disabled`]: props.disabled,
        }}
        id={labelId}
      >
        {props.labelText}
      </label>
      <div class={`${prefix}--slider-container`}>
        <span class={`${prefix}--slider__range-label`}>
          {props.formatLabel!(props.min, props.minLabel)}
        </span>
        <div
          classList={{
            [`${prefix}--slider`]: true,
            [`${prefix}--slider--disabled`]: props.disabled,
          }}
          ref={ref}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
          onKeyDown={onKeyDown}
          role="presentation"
          tabIndex={-1}
          data-invalid={isValid() ? null : true}
          {...other}
        >
          <div
            class={`${prefix}--slider__thumb`}
            role="slider"
            id={props.id}
            tabIndex={0}
            aria-valuemax={props.max}
            aria-valuemin={props.min}
            aria-valuenow={value()}
            style={{
              left: `${left()}%`,
            }}
          />
          <div class={`${prefix}--slider__track`} />
          <div
            class={`${prefix}--slider__filled-track`}
            style={{
              transform: `translate(0%, -50%) scaleX(${left() / 100})`,
            }}
          />
        </div>
        <span class={`${prefix}--slider__range-label`}>
          {props.formatLabel!(props.max, props.maxLabel)}
        </span>
        <input
          type={props.hideTextInput ? "hidden" : props.inputType}
          style={
            props.hideTextInput
              ? {
                  display: "none",
                }
              : {}
          }
          id={`${props.id}-input-for-slider`}
          name={props.name}
          classList={{
            [`${prefix}--text-input`]: true,
            [`${prefix}--slider-text-input`]: true,
            [`${prefix}--text-input--invalid`]: isValid() === false,
          }}
          value={value()}
          aria-labelledby={!props.ariaLabelInput ? labelId : undefined}
          aria-label={props.ariaLabelInput ?? undefined}
          disabled={props.disabled}
          required={props.required}
          min={props.min}
          max={props.max}
          step={props.step}
          onChange={onChange}
          onBlur={onBlur}
          onKeyUp={props.onInputKeyUp}
          data-invalid={isValid() ? null : true}
          aria-invalid={isValid() ? undefined : true}
        />
      </div>
    </div>
  );
};
