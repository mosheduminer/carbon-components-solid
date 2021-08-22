import { Component, JSX, splitProps, mergeProps } from "solid-js";
import { settings } from "carbon-components";
import { createId } from "./internal/id";

const { prefix } = settings;

export type LoadingProps = {
  active?: boolean;
  class?: string;
  description?: string;
  id?: string;
  small?: boolean;
  withOverlay?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Loading: Component<LoadingProps> = (props) => {
  let rest: JSX.HTMLAttributes<HTMLDivElement>;
  [props, rest] = splitProps(props, [
    "active",
    "class",
    "description",
    "id",
    "small",
    "withOverlay",
  ]);
  props = mergeProps(
    {
      active: true,
      withOverlay: true,
      small: true,
      description: "Active loading indicator",
    },
    props
  );
  const instanceId = createId();
  const loadingId = props.id || `loading-id-${instanceId}`;
  const loading = (
    <div
      {...rest}
      aria-atomic="true"
      aria-labelledby={loadingId}
      aria-live={props.active ? "assertive" : "off"}
      classList={{
        [props.class!]: !!props.class,
        [`${prefix}--loading`]: true,
        [`${prefix}--loading--small`]: props.small,
        [`${prefix}--loading--stop`]: !props.active,
      }}
    >
      <label id={loadingId} className={`${prefix}--visually-hidden`}>
        {props.description}
      </label>
      <svg className={`${prefix}--loading__svg`} viewBox="0 0 100 100">
        <title>{props.description}</title>
        {props.small ? (
          <circle
            className={`${prefix}--loading__background`}
            cx="50%"
            cy="50%"
            r="44"
          />
        ) : undefined}
        <circle
          className={`${prefix}--loading__stroke`}
          cx="50%"
          cy="50%"
          r="44"
        />
      </svg>
    </div>
  );
  return props.withOverlay ? (
    <div
      classList={{
        [`${prefix}--loading-overlay`]: true,
        [`${prefix}--loading-overlay--stop`]: !props.active,
      }}
    >
      {loading}
    </div>
  ) : (
    loading
  );
};