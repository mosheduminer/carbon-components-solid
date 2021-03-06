export function resetFocus(el: HTMLElement) {
  if (el) {
    Array.from(el.querySelectorAll('[tabindex="0"]') ?? []).forEach((node) => {
      (node as HTMLElement).tabIndex = -1;
    });
  }
}

export function focusNode(node: HTMLElement | null) {
  if (node) {
    node.tabIndex = 0;
    node.focus();
  }
}

export function getValidNodes(list: HTMLElement, prefix: string) {
  const { level } = list.dataset;

  let nodes: Element[] = [];

  if (level) {
    const submenus: HTMLElement[] = Array.from(
      list.querySelectorAll("[data-level]")
    );
    nodes = Array.from(
      list.querySelectorAll(`li.${prefix}--menu-option`)
    ).filter((child) => !submenus.some((submenu) => submenu.contains(child)));
  }

  return nodes.filter((node) =>
    node.matches(`:not(.${prefix}--menu-option--disabled)`)
  );
}

export function getNextNode(current: HTMLElement, direction: number, prefix: string) {
  const menu = getParentMenu(current, prefix) as HTMLElement;
  const nodes = getValidNodes(menu, prefix);
  const currentIndex = nodes.indexOf(current);

  const nextNode = nodes[currentIndex + direction];

  return nextNode || null;
}

export function getFirstSubNode(node: Element, prefix: string) {
  const submenu = node.querySelector(`ul.${prefix}--menu`) as HTMLElement;

  if (submenu) {
    const subnodes = getValidNodes(submenu, prefix);

    return subnodes[0] || null;
  }

  return null;
}

export function getParentNode(node: Node, prefix: string) {
  if (node) {
    const parentNode = (node.parentNode as Element).closest(
      `li.${prefix}--menu-option`
    );

    return parentNode || null;
  }

  return null;
}

export function getSubMenuOffset(node: HTMLElement) {
  if (node) {
    const nodeStyles = getComputedStyle(node);
    const spacings =
      parseInt(nodeStyles.paddingTop) + parseInt(nodeStyles.paddingBottom); // styles always in px, convert to number
    const elementHeight = (node.firstElementChild as HTMLElement).offsetHeight;
    return elementHeight + spacings || 0;
  }

  return 0;
}

export function getParentMenu(el: HTMLElement, prefix: string) {
  if (el) {
    const parentMenu = (el.parentNode as HTMLElement).closest(
      `ul.${prefix}--menu`
    );

    return parentMenu || null;
  }

  return null;
}

export function clickedElementHasSubnodes(e: Event, prefix: string) {
  if (e) {
    const closestFocusableElement = (e.target as HTMLElement).closest(
      "[tabindex]"
    );
    if (closestFocusableElement?.tagName === "LI") {
      return getFirstSubNode(closestFocusableElement, prefix) !== null;
    }
  }

  return false;
}

/**
 * @param {number} [value] The value to cap
 * @param {number} [min] The minimum of the range
 * @param {number} [max] The maximum of the range
 * @returns {number} Whether or not the element fits inside the boundaries on the given axis
 */
export function capWithinRange(value: number, min: number, max: number) {
  if (value > max) {
    return max;
  }

  if (value < min) {
    return min;
  }

  return value;
}

/**
 * @param {number[]} [elementDimensions] The dimensions of the element: [width, height]
 * @param {number[]} [position] The desired position of the element: [x, y]
 * @param {number[]} [boundaries] The boundaries of the container the element should be contained in: [minX, minY, maxX, maxY]
 * @param {string} [axis="x"] Which axis to check. Either "x" or "y"
 * @returns {boolean} Whether or not the element fits inside the boundaries on the given axis
 */
function elementFits(
  elementDimensions: number[],
  position: number[],
  boundaries: number[],
  axis = "x"
) {
  const index = axis === "y" ? 1 : 0;

  const min = boundaries[index];
  const max = boundaries[index + 2];

  const start = position[index];
  const end = position[index] + elementDimensions[index];

  return start >= min && end <= max;
}

/**
 * @param {number[]} [elementDimensions] The dimensions of the element: [width, height]
 * @param {number[]} [targetBoundaries] The boundaries of the target the element should attach to: [minX, minY, maxX, maxY]
 * @param {number[]} [containerBoundaries] The boundaries of the container the element should be contained in: [minX, minY, maxX, maxY]
 * @param {number} [preferredDirection=1] Which direction is preferred. Either 1 (right right) or -1 (to left)
 * @param {boolean} [isRootLevel] Flag that indicates if the element is on level 1 (the root level)
 * @param {object} [element] The list element - used to calculate the offset of submenus
 * @returns {object} The determined position and direction of the element: { position: [x, y], direction: 1 | -1 }
 */
export function getPosition(
  elementDimensions: number[],
  targetBoundaries: number[],
  containerBoundaries: number[],
  preferredDirection: number = 1,
  isRootLevel: boolean,
  element: HTMLElement
) {
  const position = [0, 0];
  let direction = preferredDirection;

  // x
  position[0] =
    direction === 1
      ? targetBoundaries[0]
      : targetBoundaries[2] - elementDimensions[0];

  const xFits = elementFits(
    elementDimensions,
    position,
    containerBoundaries,
    "x"
  );
  if (!xFits) {
    direction = direction * -1;
    position[0] =
      direction === 1
        ? targetBoundaries[0]
        : targetBoundaries[2] - elementDimensions[0];
  }

  // y
  position[1] = targetBoundaries[3];

  const yFits = elementFits(
    elementDimensions,
    position,
    containerBoundaries,
    "y"
  );
  if (!yFits) {
    position[1] = targetBoundaries[1] - elementDimensions[1];
    if (!isRootLevel && element) {
      // if sub-menu and not root level, consider offset
      const diff = getSubMenuOffset(element);
      position[1] += diff;
    }
  }

  return {
    position,
    direction,
  };
}
