import {
  Component,
  createUniqueId,
  JSX,
  mergeProps,
  Show,
  splitProps,
} from "solid-js";
import { usePrefix } from "./internal/usePrefix";

export type StructuredListWrapperProps = {
  "aria-label"?: string;
  class?: string;
  isCondensed?: boolean;
  isFlush?: boolean;
  selection?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const StructuredListWrapper: Component<StructuredListWrapperProps> = (
  props
) => {
  const prefix = usePrefix();

  props = mergeProps(
    {
      selection: false,
      "aria-label": "Structured list section",
      isCondensed: false,
      isFlush: false,
    },
    props
  );
  let rest: JSX.HTMLAttributes<HTMLDivElement>;
  [props, rest] = splitProps(props, [
    "aria-label",
    "children",
    "class",
    "isCondensed",
    "isFlush",
    "selection",
  ]);

  return (
    <div
      role="table"
      class={`${prefix}--structured-list`}
      classList={{
        [props.class!]: !!props.class,
        [`${prefix}--structured-list--selection`]: props.selection,
        [`${prefix}--structured-list--condensed`]: props.isCondensed,
        [`${prefix}--structured-list--flush`]: props.isFlush,
      }}
      {...rest}
      aria-label={props["aria-label"]}
    >
      {props.children}
    </div>
  );
};

export const StructuredListHead: Component<JSX.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    const prefix = usePrefix();
    const [, rest] = splitProps(props, ["children"]);

    return (
      <div role="rowgroup" class={`${prefix}--structured-list-thead`} {...rest}>
        {props.children}
      </div>
    );
  };

export const StructuredListBody: Component<JSX.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    const prefix = usePrefix();
    const [, rest] = splitProps(props, ["children"]);

    return (
      <div class={`${prefix}--structured-list-tbody`} role="rowgroup" {...rest}>
        {props.children}
      </div>
    );
  };

export type StructuredListRowProps = {
  head?: boolean;
  label?: boolean;
  onKeyDown?: JSX.EventHandlerUnion<HTMLLabelElement, KeyboardEvent>;
  tabIndex?: number;
} & JSX.HTMLAttributes<HTMLLabelElement | HTMLDivElement>;

export const StructuredListRow: Component<StructuredListRowProps> = (props) => {
  const prefix = usePrefix();

  let rest: JSX.HTMLAttributes<HTMLLabelElement | HTMLDivElement>;
  props = mergeProps(
    {
      head: false,
      label: false,
      tabIndex: 0,
      onKeyDown: () => {},
    },
    props
  );
  [, rest] = splitProps(props, ["head", "label", "onKeyDown", "tabIndex"]);

  return (
    <Show
      when={props.label}
      fallback={
        //@ts-ignore (ref property)
        <div
          role="row"
          {...rest}
          class={`${prefix}--structured-list-row`}
          classList={{
            [`${prefix}--structured-list-row--header-row`]: props.head,
            [props.class!]: !!props.class,
          }}
        >
          {props.children}
        </div>
      }
    >
      {/**
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions 
      //@ts-ignore (ref property)*/}
      <label
        {...rest}
        tabIndex={props.tabIndex}
        class={`${prefix}--structured-list-row`}
        classList={{
          [`${prefix}--structured-list-row--header-row`]: props.head,
          [props.class!]: !!props.class,
        }}
        onKeyDown={props.onKeyDown}
      >
        {props.children}
      </label>
    </Show>
  );
};

export type StructuredListInputProps = {
  class?: string;
  checked?: boolean;
  id?: string;
  name?: string;
  onInput?: JSX.EventHandlerUnion<HTMLInputElement, InputEvent>;
  title: string;
  value: string | number;
} & JSX.HTMLAttributes<HTMLInputElement>;

export const StructuredListInput: Component<StructuredListInputProps> = (
  props
) => {
  const prefix = usePrefix();
  const instanceId = props.id || createUniqueId();

  props = mergeProps(
    {
      onChange: () => {},
      value: "value",
      title: "title",
    },
    props
  );
  const [, rest] = splitProps(props, ["class", "id", "name", "title", "value"]);

  return (
    <input
      {...rest}
      type="radio"
      tabIndex={-1}
      id={instanceId}
      classList={{
        [`${prefix}--structured-list-input`]: true,
        [`${prefix}--visually-hidden`]: true,
        [props.class!]: !!props.class,
      }}
      value={props.value}
      name={props.name}
      title={props.title}
    />
  );
};

export type StructuredListCellProps = {
  class?: string;
  head?: boolean;
  noWrap?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const StructuredListCell: Component<StructuredListCellProps> = (
  props
) => {
  const prefix = usePrefix();

  const [, rest] = splitProps(props, ["children", "class", "head", "noWrap"]);

  return (
    <div
      classList={{
        [`${prefix}--structured-list-th`]: props.head,
        [`${prefix}--structured-list-td`]: !props.head,
        [`${prefix}--structured-list-content--nowrap`]: props.noWrap,
        [props.class!]: !!props.class,
      }}
      role={props.head ? "columnheader" : "cell"}
      {...rest}
    >
      {props.children}
    </div>
  );
};
