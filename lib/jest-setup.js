require("@testing-library/jest-dom");
require("regenerator-runtime/runtime");
const toHaveNoACViolations = require("./utils/toHaveNoACViolations");
const toHaveNoAxeViolations = require("./utils/toHaveNoAxeViolations");

expect.extend({
  toHaveNoAxeViolations,
  toHaveNoACViolations,
});
