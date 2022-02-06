import {
  children,
  Component,
  JSX,
  mergeProps,
  splitProps,
  Switch,
  Match,
  onMount,
  onCleanup,
  createEffect,
} from "solid-js";
import flatpickr from "flatpickr";
import l10n from "flatpickr/dist/l10n/index";
import { settings } from "carbon-components";
import { DatePickerInputProps } from "./DatePickerInput";
import carbonFlatpickrAppendToPlugin from "./plugins/appendToPlugin";
import carbonFlatpickrFixEventsPlugin from "./plugins/fixEventsPlugin";
import carbonFlatpickrRangePlugin from "./plugins/rangePlugin";
import { match } from "./internal/keyboard/match";
import keys from "./internal/keyboard/keys";
import { key, Locale } from "flatpickr/dist/types/locale";
import { Instance } from "flatpickr/dist/types/instance";
import { WarningAltFilled16 } from "./icons/WarningAltFilled16";
import { Calendar16 } from "./icons/Calendar16";
import { WarningFilled16 } from "./icons/WarningFilled16";
import { Hook } from "flatpickr/dist/types/options";

const { prefix } = settings;

// Weekdays shorthand for english locale
l10n.en.weekdays.shorthand.forEach((day, index) => {
  const currentDay = l10n.en.weekdays.shorthand;
  if (currentDay[index] === "Thu" || currentDay[index] === "Th") {
    currentDay[index] = "Th";
  } else {
    currentDay[index] = currentDay[index].charAt(0);
  }
});

const monthToStr = (monthNumber: number, shorthand: boolean, locale: Locale) =>
  locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];

const forEach = Array.prototype.forEach;

const carbonFlatpickrMonthSelectPlugin =
  (config: {
    classFlatpickrCurrentMonth?: string;
    selectorFlatpickrCurrentMonth?: string;
    shorthand?: boolean;
    selectorFlatpickrMonthYearContainer?: string;
    selectorFlatpickrYearContainer?: string;
  }) =>
  (fp: {
    monthElements: HTMLElement[];
    _createElement: (arg0: string, arg1: string | undefined) => any;
    currentMonth: number;
    l10n: Locale;
    yearElements: { closest: (arg0: string | undefined) => any }[];
    loadedPlugins: string[];
  }) => {
    const setupElements = () => {
      if (!fp.monthElements) {
        return;
      }
      fp.monthElements.forEach((elem) => {
        if (!elem.parentNode) {
          return;
        }
        elem.parentNode.removeChild(elem);
      });
      fp.monthElements.splice(
        0,
        fp.monthElements.length,
        ...fp.monthElements.map(() => {
          // eslint-disable-next-line no-underscore-dangle
          const monthElement = fp._createElement(
            "span",
            config.classFlatpickrCurrentMonth
          );
          monthElement.textContent = monthToStr(
            fp.currentMonth,
            config.shorthand === true,
            fp.l10n
          );
          fp.yearElements[0]
            .closest(config.selectorFlatpickrMonthYearContainer)
            .insertBefore(
              monthElement,
              fp.yearElements[0].closest(config.selectorFlatpickrYearContainer)
            );
          return monthElement;
        })
      );
    };

    const updateCurrentMonth = () => {
      const monthStr = monthToStr(
        fp.currentMonth,
        config.shorthand === true,
        fp.l10n
      );
      fp.yearElements.forEach((elem) => {
        const currentMonthContainer = elem.closest(
          config.selectorFlatpickrMonthYearContainer
        );
        Array.prototype.forEach.call(
          currentMonthContainer.querySelectorAll(".cur-month"),
          (monthElement) => {
            monthElement.textContent = monthStr;
          }
        );
      });
    };

    const register = () => {
      fp.loadedPlugins.push("carbonFlatpickrMonthSelectPlugin");
    };

    return {
      onMonthChange: updateCurrentMonth,
      onValueUpdate: updateCurrentMonth,
      onOpen: updateCurrentMonth,
      onReady: [setupElements, updateCurrentMonth, register],
    };
  };

const updateClassNames = (calendar: Instance) => {
  const calendarContainer = calendar.calendarContainer;
  const daysContainer = calendar.days;
  if (calendarContainer && daysContainer) {
    // calendarContainer and daysContainer are undefined if flatpickr detects a mobile device
    calendarContainer.classList.add(`${prefix}--date-picker__calendar`);
    calendarContainer
      .querySelector(".flatpickr-month")
      ?.classList.add(`${prefix}--date-picker__month`);
    calendarContainer
      .querySelector(".flatpickr-weekdays")
      ?.classList.add(`${prefix}--date-picker__weekdays`);
    calendarContainer
      .querySelector(".flatpickr-days")
      ?.classList.add(`${prefix}--date-picker__days`);
    forEach.call(
      calendarContainer.querySelectorAll(".flatpickr-weekday"),
      (item) => {
        const currentItem = item;
        currentItem.innerHTML = currentItem.innerHTML.replace(/\s+/g, "");
        currentItem.classList.add(`${prefix}--date-picker__weekday`);
      }
    );
    forEach.call(daysContainer.querySelectorAll(".flatpickr-day"), (item) => {
      item.classList.add(`${prefix}--date-picker__day`);
      if (
        item.classList.contains("today") &&
        calendar.selectedDates.length > 0
      ) {
        item.classList.add("no-border");
      } else if (
        item.classList.contains("today") &&
        calendar.selectedDates.length === 0
      ) {
        item.classList.remove("no-border");
      }
    });
  }
};

const rightArrowHTML = () => {
  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16">
      <polygon points="11,8 6,13 5.3,12.3 9.6,8 5.3,3.7 6,3 " />
      <rect width="16" height="16" style="fill:none" />
    </svg>
  );
};

const leftArrowHTML = () => {
  return (
    <svg width="16px" height="16px" viewBox="0 0 16 16">
      <polygon points="5,8 10,3 10.7,3.7 6.4,8 10.7,12.3 10,13 " />
      <rect width="16" height="16" style="fill:none" />
    </svg>
  );
};

export type DatePickerProps = {
  allowInput?: boolean;
  appendTo?: HTMLElement;
  class?: string;
  dateFormat?: string;
  datePickerType?: "simple" | "single" | "range";
  disable?: string[];
  enable?: string[];
  light?: boolean;
  locale?: key | { locale: key };
  maxDate?: string;
  minDate?: string;
  onInput?: Hook;
  onClose?: Hook;
  onOpen?: Hook;
  short?: boolean;
  value?: string | (string | number | Date)[] | Date | number;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const DatePicker: Component<DatePickerProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLDivElement>;
  [props, rest] = splitProps(props, [
    "allowInput",
    "appendTo",
    "children",
    "class",
    "dateFormat",
    "datePickerType",
    "disable",
    "enable",
    "light",
    "locale",
    "maxDate",
    "minDate",
    "onClose",
    "onInput",
    "onOpen",
    "short",
    "value",
  ]);
  props = mergeProps(
    { short: false, light: false, dateFormat: "m/d/Y", locale: "en" },
    props
  );

  let inputFieldRef: HTMLInputElement;
  let toInputFieldRef: HTMLInputElement;

  let cal: Instance;

  const onChange = () => {
    if (inputFieldRef.value === "" && cal?.selectedDates.length) {
      cal.clear();
      cal.input.focus();
    }
  };

  const addKeyboardEvents = (cal: Instance) => {
    const initArrowDownListener = (element: HTMLElement) => {
      if (element) {
        element.addEventListener("keydown", (e) => {
          if (match(e, keys.ArrowDown)) {
            const {
              calendarContainer,
              selectedDateElem: fpSelectedDateElem,
              todayDateElem: fptodayDateElem,
            } = cal;
            const selectedDateElem =
              calendarContainer.querySelector(".selected") &&
              fpSelectedDateElem;
            const todayDateElem =
              calendarContainer.querySelector(".today") && fptodayDateElem;
            (
              selectedDateElem ||
              todayDateElem ||
              (calendarContainer.querySelector(
                ".flatpickr-day[tabindex]"
              ) as HTMLElement) ||
              calendarContainer
            ).focus();
          }
        });
        element.addEventListener("change", onChange);
      }
    };
    initArrowDownListener(inputFieldRef);
    initArrowDownListener(toInputFieldRef);
  };

  const addRoleAttributeToDialog = () => {
    if (inputFieldRef) {
      cal.calendarContainer.setAttribute("role", "region");
      // IBM EAAC requires an aria-label on a role='region'
      cal.calendarContainer.setAttribute("aria-label", "calendar-container");
    }
  };

  onMount(() => {
    if (props.datePickerType === "single" || props.datePickerType === "range") {
      const onHook = (
        electedDates: Date[],
        dateStr: string,
        instance: Instance,
        _: any
      ) => {
        updateClassNames(instance);
      };

      // Logic to determine if `enable` or `disable` will be passed down. If neither
      // is provided, we return the default empty disabled array, allowing all dates.
      let enableOrDisable = props.enable ? "enable" : "disable";
      let enableOrDisableArr;
      if (!props.enable && !props.disable) {
        enableOrDisableArr = [];
      } else if (props.enable) {
        enableOrDisableArr = props.enable;
      } else {
        enableOrDisableArr = props.disable;
      }

      let localeData;
      if (typeof props.locale === "object") {
        let location = props.locale.locale ? props.locale.locale : "en";
        localeData = { ...l10n[location], ...props.locale };
      } else {
        localeData = l10n[props.locale!];
      }

      if (inputFieldRef) {
        //@ts-ignore
        cal = flatpickr(inputFieldRef, {
          disableMobile: true,
          defaultDate: props.value,
          mode: props.datePickerType,
          allowInput: props.allowInput ?? true,
          dateFormat: props.dateFormat,
          locale: localeData,
          [enableOrDisable]: enableOrDisableArr,
          minDate: props.minDate,
          maxDate: props.maxDate,
          plugins: [
            props.datePickerType === "range"
              ? carbonFlatpickrRangePlugin({
                  input: toInputFieldRef,
                })
              : () => {},
            props.appendTo
              ? carbonFlatpickrAppendToPlugin({
                  appendTo: props.appendTo,
                })
              : () => {},
            carbonFlatpickrMonthSelectPlugin({
              selectorFlatpickrMonthYearContainer: ".flatpickr-current-month",
              selectorFlatpickrYearContainer: ".numInputWrapper",
              selectorFlatpickrCurrentMonth: ".cur-month",
              classFlatpickrCurrentMonth: "cur-month",
            }),
            carbonFlatpickrFixEventsPlugin({
              inputFrom: inputFieldRef,
              inputTo: toInputFieldRef,
            }),
          ],
          clickOpens: true,
          nextArrow: rightArrowHTML(),
          prevArrow: leftArrowHTML(),
          onChange: (...args) => {
            if (props.onInput) {
              props.onInput(...args);
            }
          },
          onClose: props.onClose,
          onReady: onHook,
          onMonthChange: onHook,
          onYearChange: onHook,
          onOpen: (...args) => {
            onHook(...args);
            if (props.onOpen) {
              props.onOpen(...args);
            }
          },
          onValueUpdate: onHook,
        });
        addKeyboardEvents(cal);
        addRoleAttributeToDialog();
      }
    }
  });

  createEffect<{
    dateFormat?: string;
    minDate?: string;
    maxDate?: string;
    value?: string | (string | number | Date)[] | Date | number;
    disable?: string[];
    enable?: string[];
  }>((old) => {
    const { dateFormat, minDate, maxDate, value, disable, enable } = props;
    if (old) {
      const {
        dateFormat: prevDateFormat,
        minDate: prevMinDate,
        maxDate: prevMaxDate,
        value: prevValue,
        disable: prevDisable,
        enable: prevEnable,
      } = old;
      if (cal) {
        if (prevDateFormat !== dateFormat) {
          cal.set({ dateFormat });
        }
        if (prevMinDate !== minDate) {
          cal.set("minDate", minDate);
        }
        if (prevMaxDate !== maxDate) {
          cal.set("maxDate", maxDate);
        }
        if (disable !== prevDisable) {
          cal.set("disable", disable);
        }
        if (enable !== prevEnable) {
          cal.set("enable", enable);
        }
      }

      // Coordinate when the given `value` prop changes. When this happens, we
      // should update the calendar to the new value.
      if (prevValue !== value) {
        if (cal) {
          cal.setDate(props.value!);
          updateClassNames(cal);
        } else if (inputFieldRef) {
          //@ts-ignore
          inputFieldRef.value = props.value;
        }
      }
    }
    return {
      dateFormat,
      minDate,
      maxDate,
      value,
      disable,
      enable,
    };
  });

  onCleanup(() => {
    if (cal) {
      cal.destroy();
    }
    if (inputFieldRef) {
      inputFieldRef.removeEventListener("change", onChange);
    }
    if (toInputFieldRef) {
      toInputFieldRef.removeEventListener("change", onChange);
    }
  });

  type Child = (DatePickerInputProps | HTMLInputElement);

  const c = (() => {
    const c = children(() => props.children)()
    if (Array.isArray(c)) return c
    return [c]
  }) as () => Child[];


  const isLabelTextEmpty = () =>
    c().every((child) => child instanceof HTMLElement || !child.labelText);

  return (
    <div class={`${prefix}--form-item`}>
      <div
        class={`${prefix}--date-picker`}
        classList={{
          [props.class!]: !!props.class,
          [`${prefix}--date-picker--short`]: props.short,
          [`${prefix}--date-picker--light`]: props.light,
          [`${prefix}--date-picker--simple`]: props.datePickerType === "simple",
          [`${prefix}--date-picker--single`]: props.datePickerType === "single",
          [`${prefix}--date-picker--range`]: props.datePickerType === "range",
          [`${prefix}--date-picker--nolabel`]:
            props.datePickerType === "range" && isLabelTextEmpty(),
        }}
        {...rest}
      >
        {c().map((child, index) => {
          if (child instanceof HTMLElement) {
            if (index === 0) {
              inputFieldRef = child;
            } else if (index === 1) {
              toInputFieldRef = child;
            }
            return child;
          }
          let childProps: DatePickerInputProps = child;
          let childRest: JSX.HTMLAttributes<HTMLInputElement>;
          [childProps, childRest] = splitProps(childProps, [
            "children",
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
          const datePickerInputProps = () => ({
            id: childProps.id,
            onChange: (
              evt: Event & { currentTarget: HTMLInputElement; target: Element }
            ) => {
              if (!childProps.disabled) {
                childProps.onChange && childProps.onChange(evt);
              }
            },
            onClick: (
              evt: MouseEvent & {
                currentTarget: HTMLInputElement;
                target: Element;
              }
            ) => {
              if (!childProps.disabled) {
                childProps.onClick && childProps.onClick(evt);
              }
            },
            placeholder: childProps.placeholder,
            type: childProps.type,
            pattern: childProps.pattern,
          });
          const error = () => {
            if (childProps.invalid) {
              return (
                <div class={`${prefix}--form-requirement`}>
                  {childProps.invalidText}
                </div>
              );
            } else if (childProps.warn) {
              return (
                <div class={`${prefix}--form-requirement`}>
                  {childProps.warnText}
                </div>
              );
            }
          };
          const inputClasses = () => ({
            [`${prefix}--date-picker__input--${childProps.size}`]:
              !!childProps.size,
            [`${prefix}--date-picker__input--invalid`]: childProps.invalid,
          });
          console.log(props.datePickerType)
          return (
            <div
              classList={{
                [`${prefix}--date-picker--nolabel`]: !childProps.labelText,
              }}
              class={`${prefix}--date-picker-container`}
            >
              {childProps.labelText ? (
                <label
                  for={childProps.id}
                  classList={{
                    [`${prefix}--visually-hidden`]: childProps.hideLabel,
                    [`${prefix}--label--disabled`]: childProps.disabled,
                  }}
                  class={`${prefix}--label`}
                >
                  {childProps.labelText}
                </label>
              ) : undefined}
              <div
                classList={{
                  [`${prefix}--date-picker-input__wrapper--invalid`]:
                    childProps.invalid,
                  [`${prefix}--date-picker-input__wrapper--warn`]:
                    childProps.warn,
                }}
                class={`${prefix}--date-picker-input__wrapper`}
              >
                {childProps.invalid ? (
                  <input
                    {...childRest}
                    ref={index === 0 ? inputFieldRef : toInputFieldRef}
                    {...datePickerInputProps()}
                    disabled={childProps.disabled}
                    data-invalid
                    classList={inputClasses()}
                    class={`${prefix}--date-picker__input`}
                  />
                ) : (
                  <input
                    {...childRest}
                    ref={index === 0 ? inputFieldRef : toInputFieldRef}
                    {...datePickerInputProps}
                    disabled={childProps.disabled}
                    class={`${prefix}--date-picker__input`}
                    classList={inputClasses()}
                  />
                )}
                <Switch
                  fallback={
                    <Calendar16
                      class={`${prefix}--date-picker__icon`}
                      aria-label={childProps.iconDescription}
                      onClick={childProps.openCalendar}
                      role="img"
                    >
                      {childProps.iconDescription && (
                        <title>{childProps.iconDescription}</title>
                      )}
                    </Calendar16>
                  }
                >
                  <Match
                    when={
                      props.datePickerType === "simple" &&
                      !childProps.invalid &&
                      !childProps.warn
                    }
                  >
                    {undefined}
                  </Match>
                  <Match when={childProps.invalid}>
                    <WarningFilled16
                      class={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--invalid`}
                    />
                  </Match>
                  <Match when={!childProps.invalid && childProps.warn}>
                    <WarningAltFilled16
                      class={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--warn`}
                    />
                  </Match>
                </Switch>
              </div>
              {error()}
            </div>
          );
        })}
      </div>
    </div>
  );
};
