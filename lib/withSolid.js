// adapted from https://github.com/amoutonbrady/rollup-preset-solid/blob/master/src/index.ts

var __require = (x) => {
  if (typeof require !== "undefined")
    return require(x);
  throw new Error('Dynamic require of "' + x + '" is not supported');
};

// src/index.ts
import ts from "typescript";
import { rmSync } from "fs";
import { babel } from "@rollup/plugin-babel";
import { resolve, dirname } from "path";
import { mergeAndConcat } from "merge-anything";
import { nodeResolve } from "@rollup/plugin-node-resolve";
function findClosestPackageJson(start = process.cwd(), level = 0) {
  try {
    const path = resolve(start, "package.json");
    return __require(path);
  } catch {
    return level >= 10 ? {} : findClosestPackageJson(dirname(start), level + 1);
  }
}
function processOptions(options, asSubPackage = true) {
  const {
    targets: buildTargets,
    writePackageJson,
    printInstructions,
    tsProgramRoots,
    ...rollupOptions
  } = options;
  const currentDir = process.cwd();
  const targets = buildTargets || ["esm"];
  const pkg = findClosestPackageJson(currentDir);
  const extensions = [".js", ".ts", ".jsx", ".tsx"];
  const src = options.input || pkg.source;
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ];
  if (!src) {
    throw new Error("No input source found. You can add it to the `source` property in your `package.json` or feed it into the `input` option in the `withConfig` function.");
  }
  const outputs = [
    {
      format: "cjs",
      file: void 0,
      dir: resolve("dist/cjs"),
      sourcemap: true
    },
    {
      format: "esm",
      file: void 0,
      dir: resolve("dist/esm"),
      sourcemap: true
    },
  ];
  const output = outputs.filter(({ format }) => targets.includes(format));
  const defaultOptions = {
    input: src,
    external: ["solid-js", "solid-js/web", "solid-js/store", ...external],
    output,
    plugins: [
      babel({
        extensions,
        babelHelpers: "bundled",
        presets: ["babel-preset-solid", "@babel/preset-typescript"]
      }),
      nodeResolve({ extensions }),
      {
        name: "ts",
        buildEnd() {
          const program = ts.createProgram(tsProgramRoots, {
            target: ts.ScriptTarget.ESNext,
            module: ts.ModuleKind.ESNext,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            jsx: ts.JsxEmit.Preserve,
            jsxImportSource: "solid-js",
            allowSyntheticDefaultImports: true,
            esModuleInterop: true,
            outDir: `dist/source`,
            declarationDir: `dist/types`,
            declaration: true,
            allowJs: true
          });
          program.emit();
        }
      },
    ]
  };
  return mergeAndConcat(rollupOptions, defaultOptions);
}
function withSolid(options = {}) {
  rmSync(resolve(process.cwd(), "dist"), {
    force: true,
    recursive: true
  });
  return Array.isArray(options) ? options.map((option) => processOptions(option, true)) : processOptions(options, false);
}
export {
  withSolid as default
};
//# sourceMappingURL=index.js.map
