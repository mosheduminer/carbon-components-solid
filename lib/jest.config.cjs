/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      babelConfig: {
        presets: ["babel-preset-solid", "@babel/preset-env"],
      },
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "solid-js/web": "<rootDir>/../node_modules/solid-js/web/dist/web.cjs",
    "solid-js": "<rootDir>/../node_modules/solid-js/dist/solid.cjs",
  },
};