require("@testing-library/jest-dom");
require("regenerator-runtime/runtime");
const toHaveNoACViolations = require("./test-utils/toHaveNoACViolations");
const toHaveNoAxeViolations = require("./test-utils/toHaveNoAxeViolations");

expect.extend({
  toHaveNoAxeViolations,
  toHaveNoACViolations,
});
