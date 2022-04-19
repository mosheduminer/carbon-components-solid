import { Button } from "../Button";
import { TableActionList } from "./TableActionList";
import { Text } from "../Text";
import { Component, createSignal, JSX, mergeProps, splitProps } from "solid-js";
import { usePrefix } from "../internal/usePrefix";

export const translationKeys = {
  "carbon.table.batch.cancel": "Cancel",
  "carbon.table.batch.items.selected": "items selected",
  "carbon.table.batch.item.selected": "item selected",
};

const translateWithId = (
  id: keyof typeof translationKeys,
  state: { totalSelected: number }
) => {
  if (id === "carbon.table.batch.cancel") {
    return translationKeys[id];
  }
  return `${state.totalSelected} ${translationKeys[id]}`;
};

export type TableBatchActionsProps = {
  class?: string;
  onCancel: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
  shouldShowBatchActions?: boolean;
  totalSelected: number;
  translateWithId?: (
    id: keyof typeof translationKeys,
    state: { totalSelected: number }
  ) => string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const TableBatchActions: Component<TableBatchActionsProps> = (props) => {
  const prefix = usePrefix();
  const [isScrolling, setIsScrolling] = createSignal(false);
  props = mergeProps({ translateWithId }, props);
  const [, rest] = splitProps(props, [
    "class",
    "onCancel",
    "shouldShowBatchActions",
    "totalSelected",
    "translateWithId",
  ]);
  const t = (
    id: keyof typeof translationKeys,
    state: { totalSelected: number }
  ) => props.translateWithId!(id, state);

  return (
    <div
      onScroll={() => {
        setIsScrolling((v) => !v);
      }}
      aria-hidden={!props.shouldShowBatchActions}
      classList={{
        [`${prefix}--batch-actions`]: true,
        [`${prefix}--batch-actions--active`]: props.shouldShowBatchActions,
        [props.class!]: !!props.class,
      }}
      {...rest}
    >
      <div
        class={`${prefix}--batch-summary`}
        classList={{
          [`${prefix}--batch-summary__scroll`]: isScrolling(),
        }}
      >
        <p class={`${prefix}--batch-summary__para`}>
          <Text as="span">
            {props.totalSelected > 1 || props.totalSelected === 0
              ? t("carbon.table.batch.items.selected", {
                  totalSelected: props.totalSelected,
                })
              : t("carbon.table.batch.item.selected", {
                  totalSelected: props.totalSelected,
                })}
          </Text>
        </p>
      </div>
      <TableActionList>
        {props.children}
        <Button
          class={`${prefix}--batch-summary__cancel`}
          tabIndex={props.shouldShowBatchActions ? 0 : -1}
          onClick={props.onCancel}
        >
          {t("carbon.table.batch.cancel", {
            totalSelected: props.totalSelected,
          })}
        </Button>
      </TableActionList>
    </div>
  );
};
