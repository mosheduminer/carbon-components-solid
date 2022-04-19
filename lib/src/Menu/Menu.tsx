import keys from "../internal/keyboard/keys";
import { match } from "../internal/keyboard/match";

import {
  capWithinRange,
  clickedElementHasSubnodes,
  focusNode as focusNodeUtil,
  getNextNode,
  getParentMenu,
  getParentNode,
  getPosition,
  getValidNodes,
  resetFocus,
} from "./_utils";

import {
  Component,
  createEffect,
  createSignal,
  mergeProps,
  on,
  Show,
  splitProps,
  JSX,
  children,
  Accessor,
} from "solid-js";
import { Portal } from "solid-js/web";
import { callEventHandlerUnion } from "../internal/callEventHandlerUnion";
import { usePrefix } from "../internal/usePrefix";

const margin = 16; // distance to keep to body edges, in px
const defaultSize = "sm";

export type MenuProps = {
  /**
   * Specify a custom className to apply to the ul node
   */
  class?: string;
  /**
   * Define an ID for this menu
   */
  id?: string;
  /**
   * Internal: keeps track of the nesting level of the menu
   */
  level?: number;
  /**
   * Function called when the menu is closed
   */
  onClose?: Function;
  /**
   * Specify whether the Menu is currently open
   */
  open?: boolean;
  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optionally pass an element the Menu should be appended to as a child. Defaults to document.body.
   */
  target?: HTMLElement;
  /**
   * Specify the x position where this menu is rendered
   */
  x?: number | number[];
  /**
   * Specify the y position where this menu is rendered
   */
  y?: number | number[];
} & JSX.HTMLAttributes<HTMLUListElement>;

export const Menu: Component<MenuProps> = (props) => {
  const prefix = usePrefix();
  props = mergeProps(
    {
      level: 1,
      size: defaultSize,
      x: 0,
      y: 0,
      onClose: () => {},
    },
    props
  );
  const [, rest] = splitProps(props, [
    "children",
    "class",
    "id",
    "level",
    "open",
    "size",
    "target",
    "x",
    "y",
    "onClose",
  ]);
  const [direction, setDirection] = createSignal(1); // 1 = to right, -1 = to left
  const [position, setPosition] = createSignal([props.x, props.y]);
  const isRootMenu = () => props.level === 1;
  let rootRef!: HTMLUListElement;
  let focusReturn!: HTMLElement;

  function returnFocus() {
    if (focusReturn) {
      focusReturn.focus();
    }
  }

  function close(eventType: string) {
    const isKeyboardEvent = /^key/.test(eventType);

    if (isKeyboardEvent) {
      window.addEventListener("keyup", returnFocus, { once: true });
    } else {
      window.addEventListener("mouseup", returnFocus, { once: true });
    }

    props.onClose?.();
  }

  function getContainerBoundaries() {
    const { clientWidth: bodyWidth, clientHeight: bodyHeight } = document.body;
    return [margin, margin, bodyWidth - margin, bodyHeight - margin];
  }

  function getTargetBoundaries() {
    const x = props.x;
    const y = props.y;
    const xIsRange = typeof x === "object" && x.length === 2;
    const yIsRange = typeof y === "object" && y.length === 2;

    const targetBoundaries = [
      xIsRange ? x[0] : x,
      yIsRange ? y[0] : y,
      xIsRange ? x[1] : x,
      yIsRange ? y[1] : y,
    ] as number[];

    if (!isRootMenu()) {
      const { width: parentWidth } =
        getParentMenu(rootRef, prefix)?.getBoundingClientRect()!;

      targetBoundaries[2] -= parentWidth;
    }

    const containerBoundaries = getContainerBoundaries();

    return [
      capWithinRange(
        targetBoundaries[0],
        containerBoundaries[0],
        containerBoundaries[2]
      ),
      capWithinRange(
        targetBoundaries[1],
        containerBoundaries[1],
        containerBoundaries[3]
      ),
      capWithinRange(
        targetBoundaries[2],
        containerBoundaries[0],
        containerBoundaries[2]
      ),
      capWithinRange(
        targetBoundaries[3],
        containerBoundaries[1],
        containerBoundaries[3]
      ),
    ];
  }

  function focusNode(node: HTMLElement | undefined) {
    if (node) {
      resetFocus(rootRef);
      focusNodeUtil(node);
    }
  }

  function handleKeyDown(
    event: KeyboardEvent & {
      currentTarget: HTMLUListElement;
      target: Element;
    }
  ) {
    if (match(event, keys.Tab)) {
      event.preventDefault();
      close(event.type);
    }

    if (
      event.target.tagName === "LI" &&
      (match(event, keys.Enter) || match(event, keys.Space))
    ) {
      handleClick(event);
    } else {
      event.stopPropagation();
    }

    if (
      match(event, keys.Escape) ||
      (!isRootMenu() && match(event, keys.ArrowLeft))
    ) {
      close(event.type);
    }

    let nodeToFocus;

    if (event.target.tagName === "LI") {
      const currentNode = event.target as HTMLElement;

      if (match(event, keys.ArrowUp)) {
        nodeToFocus = getNextNode(currentNode, -1, prefix);
      } else if (match(event, keys.ArrowDown)) {
        nodeToFocus = getNextNode(currentNode, 1, prefix);
      } else if (match(event, keys.ArrowLeft)) {
        nodeToFocus = getParentNode(currentNode, prefix);
      }
    } else if (event.target.tagName === "UL") {
      const validNodes = getValidNodes(event.target as HTMLElement, prefix);

      if (validNodes.length > 0 && match(event, keys.ArrowUp)) {
        nodeToFocus = validNodes[validNodes.length - 1];
      } else if (validNodes.length > 0 && match(event, keys.ArrowDown)) {
        nodeToFocus = validNodes[0];
      }
    }

    focusNode(nodeToFocus as HTMLElement);

    callEventHandlerUnion(rest.onKeyDown, event);
  }

  function handleClick(
    event: Event & {
      currentTarget: HTMLUListElement;
      target: Element;
    }
  ) {
    if (!clickedElementHasSubnodes(event, prefix) && event.target.tagName !== "UL") {
      close(event.type);
    } else {
      event.stopPropagation();
    }
  }

  function getCorrectedPosition(preferredDirection: number) {
    const elementRect = rootRef.getBoundingClientRect();
    const elementDimensions = [elementRect.width, elementRect.height];
    const targetBoundaries = getTargetBoundaries();
    const containerBoundaries = getContainerBoundaries();
    const { position: correctedPosition, direction: correctedDirection } =
      getPosition(
        elementDimensions,
        targetBoundaries,
        containerBoundaries,
        preferredDirection,
        isRootMenu(),
        rootRef
      );

    setDirection(correctedDirection);

    return correctedPosition;
  }

  function handleBlur(event: FocusEvent) {
    if (isRootMenu() && !rootRef.contains(event.relatedTarget as Node)) {
      close(event.type);
    }
  }

  createEffect(
    on(
      () => [props.open, props.x, props.y],
      () => {
        if (props.open) {
          focusReturn = document.activeElement as HTMLElement;
          let localDirection = 1;

          if (isRootMenu()) {
            rootRef.focus();
          } else {
            const parentMenu = getParentMenu(rootRef, prefix);

            if (parentMenu) {
              localDirection = Number(
                (parentMenu as HTMLElement).dataset.direction
              );
            }
          }

          const correctedPosition = getCorrectedPosition(localDirection);
          setPosition(correctedPosition);
        } else {
          setPosition([0, 0]);
        }
      }
    )
  );

  const rawChilds = children(() => props.children);
  const childs = (() =>
    Array.isArray(rawChilds()) ? rawChilds() : [rawChilds()]) as Accessor<
    JSX.Element[]
  >;

  const someNodesHaveIcons = () => {
    const assertion = (el: any) =>
      el.role === "menuitemcheckbox" || el.role === "none";
    const c = childs();
    return c.some(assertion);
  };

  const childrenToRender = () =>
    childs().map((node) => {
      if (typeof node === "function") {
        //@ts-ignore
        return node(someNodesHaveIcons, () => props.level);
      } else {
        return node;
      }
    });

  const Menu = () => (
    <ul
      id={props.id}
      ref={rootRef}
      class={`${prefix}--menu`}
      classList={{
        [`${prefix}--menu--${props.size}`]: props.size !== defaultSize,
        [`${prefix}--menu--open`]: props.open,
        [`${prefix}--menu--invisible`]:
          props.open && position()[0] === 0 && position()[1] === 0,
        [`${prefix}--menu--root`]: isRootMenu(),
        [props.class!]: !!props.class,
      }}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onBlur={handleBlur}
      role={"menu"}
      tabIndex={-1}
      data-direction={direction()}
      data-level={props.level}
      style={{
        left: `${position()[0]}px`,
        top: `${position()[1]}px`,
      }}
      {...rest}
    >
      {childrenToRender()}
    </ul>
  );

  return (
    <Show
      when={isRootMenu()}
      fallback={
        <Show when={props.open}>
          <Portal mount={props.target}>
            <Menu />
          </Portal>
        </Show>
      }
    >
      <Menu />
    </Show>
  );
};
