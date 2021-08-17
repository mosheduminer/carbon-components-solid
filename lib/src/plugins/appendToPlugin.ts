/**
 * This code was copied from the carbon components project.
 * The license information is as follows:
 * 
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file ~~at in the root directory of this source tree~~
 * https://github.com/carbon-design-system/carbon/blob/main/LICENSE.
 */

import { Plugin } from "flatpickr/dist/types/options";

/**
 * @param {object} config Plugin configuration.
 * @returns {Plugin} A Flatpickr plugin to put adjust the position of calendar dropdown.
 */
export default (config: { appendTo: HTMLElement }): Plugin => (fp) => {
  /**
   * Adjusts the floating meun position after Flatpicker sets it.
   */
  const handlePreCalendarPosition = () => {
    Promise.resolve().then(() => {
      const {
        calendarContainer,
        config: fpConfig,
        _positionElement: positionElement,
      } = fp;
      const { appendTo }= fpConfig;
      const {
        left: containerLeft,
        top: containerTop,
      } = appendTo!.getBoundingClientRect();
      const {
        left: refLeft,
        bottom: refBottom,
      } = positionElement.getBoundingClientRect();
      if (
        (appendTo !== appendTo!.ownerDocument.body ||
          containerLeft !== 0 ||
          containerTop !== 0) &&
        appendTo!.ownerDocument.defaultView!
          .getComputedStyle(appendTo!)
          .getPropertyValue('position') === 'static'
      ) {
        throw new Error(
          'Floating menu container must not have `position:static`.'
        );
      }
      // `2` for negative mergin on calendar dropdown
      calendarContainer.style.top = `${refBottom - containerTop + 2}px`;
      calendarContainer.style.left = `${refLeft - containerLeft}px`;
    });
  };

  /**
   * Registers this Flatpickr plugin.
   */
  const register = () => {
    fp.loadedPlugins.push('carbonFlatpickrAppendToPlugin');
  };

  return {
    appendTo: config.appendTo,
    onReady: register,
    onPreCalendarPosition: handlePreCalendarPosition,
  };
};