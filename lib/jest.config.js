/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      babelConfig: {
        presets: ["babel-preset-solid"],
      },
    },
  },
  // if using `ts-jest` the following is required
  // see https://github.com/solidjs/solid/discussions/425#discussioncomment-686291
  moduleNameMapper: {
    "solid-js": "<rootDir>/node_modules/solid-js/dist/solid.js",
  },
};