import fs from "fs";
import { gracefulify } from "graceful-fs";
gracefulify(fs);
import withSolid from "./withSolid";
import image from "@rollup/plugin-image";
import commonjs from "@rollup/plugin-commonjs";
import multiInput from "rollup-plugin-multi-input";
import { resolve } from "path";

export default withSolid({
  input: ["src/**/*.ts*"],
  tsProgramRoots: [
    resolve("src/index.ts"),
    ...fs.readdirSync("src/icons").map(path => resolve("src/icons", path)),
    ...fs.readdirSync("src/UIShell").map(path => resolve("src/UIShell", path)),
  ],
  targets: ["esm", "cjs"],
  plugins: [multiInput(), commonjs(), image()],
});
