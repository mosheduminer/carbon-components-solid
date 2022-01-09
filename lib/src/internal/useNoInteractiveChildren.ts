/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createEffect } from "solid-js";

export function useNoInteractiveChildren(
  ref: any,
  message = "component should have no interactive child nodes"
) {
  //@ts-ignore
  if (import.meta?.env?.DEV) {
    createEffect(() => {
      const node = ref ? getInteractiveContent(ref) : false;

      if (node) {
        throw new Error(
          `Error: ${message}.\n\nInstead found: ${node.outerHTML}`
        );
      }
    });
  }
}

/**
 * Determines if a given DOM node has interactive content, or is itself
 * interactive. It returns the interactive node if one is found
 *
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
export function getInteractiveContent(node: HTMLElement): HTMLElement | null {
  if (isFocusable(node)) {
    return node;
  }

  for (const childNode of node.childNodes) {
    const interactiveNode = getInteractiveContent(childNode as HTMLElement);
    if (interactiveNode) {
      return interactiveNode;
    }
  }

  return null;
}

/**
 * Determines if the given element is focusable, or not
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 * @see https://github.com/w3c/aria-practices/blob/0553bb51588ffa517506e2a1b2ca1422ed438c5f/examples/js/utils.js#L68
 */
function isFocusable(element: HTMLElement) {
  if (element.tabIndex < 0) {
    return false;
  }

  //@ts-ignore
  if (element.disabled) {
    return false;
  }

  switch (element.nodeName) {
    case "A":
      //@ts-ignore
      return !!element.href && element.rel !== "ignore";
    case "INPUT":
      //@ts-ignore
      return element.type !== "hidden";
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
}
