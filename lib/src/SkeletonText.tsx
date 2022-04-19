import {
  Component,
  JSX,
  splitProps,
  mergeProps,
  For,
  Switch,
  Match,
} from "solid-js";
import { usePrefix } from "./internal/usePrefix";

const randoms = [0.973051493507435, 0.15334737213558558, 0.5671034553053769];

function getRandomInt(min: number, max: number, n: number) {
  return Math.floor(randoms[n % 3] * (max - min + 1)) + min;
}

export interface SkeletonTextProps {
  paragraph?: boolean;
  width?: string;
  lineCount?: number;
  heading?: boolean;
  class?: string;
}

export const SkeletonText: Component<SkeletonTextProps> = (allProps) => {
  const prefix = usePrefix();
  let rest: JSX.HTMLAttributes<HTMLParagraphElement>;
  [allProps, rest] = splitProps(allProps, [
    "paragraph",
    "width",
    "lineCount",
    "heading",
    "class",
  ]);
  const props: Required<SkeletonTextProps> = mergeProps(
    {
      paragraph: false,
      heading: false,
      lineCount: 3,
      width: "100%",
      class: "",
    },
    allProps
  );

  const widthNum = () => parseInt(props.width, 10);

  const widthPx = () => props.width.includes("px");

  const widthPercent = () => props.width.includes("%");

  return (
    <Switch
      fallback={
        <p
          class={`${prefix}--skeleton__text`}
          classList={{
            [`${prefix}--skeleton__heading`]: props.heading,
            [props.class]: props.class !== undefined,
          }}
          style={{ width: props.width }}
          {...rest}
        />
      }
    >
      <Match when={widthPercent() && props.paragraph}>
        <div>
          <For each={Array(props.lineCount)}>
            {(_, i) => (
              <p
                class={`${prefix}--skeleton__text`}
                classList={{
                  [`${prefix}--skeleton__heading`]: props.heading,
                  //@ts-ignore
                  [props.class]: props.class !== undefined,
                }}
                style={{
                  width: `calc(${props.width} - ${
                    getRandomInt(0, 75, i()) + "px"
                  })`,
                }}
                {...rest}
              />
            )}
          </For>
        </div>
      </Match>
      <Match when={widthPx() && props.paragraph}>
        <div>
          <For each={Array(props.lineCount)}>
            {(_, i) => (
              <p
                class={`${prefix}--skeleton__text`}
                classList={{
                  [`${prefix}--skeleton__heading`]: props.heading,
                  //@ts-ignore
                  [props.class]: props.class !== undefined,
                }}
                style={{
                  width: getRandomInt(widthNum() - 75, widthNum(), i()) + "px",
                }}
                {...rest}
              />
            )}
          </For>
        </div>
      </Match>
    </Switch>
  );
};
