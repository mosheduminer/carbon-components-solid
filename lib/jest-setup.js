require("@testing-library/jest-dom");
require("regenerator-runtime/runtime");
const toHaveNoACViolations = require("./test-utils/toHaveNoACViolations");
const toHaveNoAxeViolations = require("./test-utils/toHaveNoAxeViolations");

expect.extend({
  toHaveNoAxeViolations,
  toHaveNoACViolations,
});

/// https://github.com/nickcolley/jest-axe/issues/147
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
