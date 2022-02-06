/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Close20 } from "../icons/Close20";
import { ChevronRight20 } from "../icons/ChevronRight20";

import { usePrefix } from "../internal/usePrefix";
import { Component, JSX, mergeProps } from "solid-js";
import { callEventHandlerUnion } from "../internal/callEventHandlerUnion";

export type SideNavFooterProps = {
  /**
   * Provide text to be read to screen readers and shown as a tooltip when
   * interacting with the toggle button in the footer
   */
  assistiveText: string;
  class?: string;
  /**
   * Specify whether the side navigation is expanded or collapsed
   */
  expanded: boolean;
  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded?: boolean;
  /**
   * Provide a function that is called when the toggle button is interacted
   * with. Useful for controlling the expansion state of the side navigation.
   */
  onToggle: JSX.EventHandlerUnion<HTMLElement, MouseEvent>;
};

/**
 * SideNavFooter is used for rendering the button at the bottom of the side
 * navigation that is a part of the UI Shell. It is responsible for handling the
 * user interaction to expand or collapse the side navigation.
 */
export const SideNavFooter: Component<SideNavFooterProps> = (props) => {
  props = mergeProps(
    {
      assistiveText: "Toggle opening or closing the side navigation",
    },
    props
  );
  const prefix = usePrefix();
  return (
    <footer
      className={`${prefix}--side-nav__footer`}
      classList={{ [props.class!]: !!props.class }}
    >
      <button
        className={`${prefix}--side-nav__toggle`}
        type="button"
        onClick={(evt) => callEventHandlerUnion(props.onToggle, evt)}
        title={props.assistiveText}
      >
        <div className={`${prefix}--side-nav__icon`}>
          {props.expanded ? <Close20 /> : <ChevronRight20 />}
        </div>
        <span class={`${prefix}--assistive-text`}>{props.assistiveText}</span>
      </button>
    </footer>
  );
};
