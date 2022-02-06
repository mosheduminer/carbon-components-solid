import fs from "fs";
import { gracefulify } from "graceful-fs";
gracefulify(fs);
import withSolid from "./withSolid";
import image from "@rollup/plugin-image";
import commonjs from "@rollup/plugin-commonjs";
import multiInput from "rollup-plugin-multi-input";

export default withSolid({
  input: ["src/**/*.ts*"],
  tsProgramRoots: [
    "src/index.ts",
    "src/icons/index.ts",
    ...fs.readdirSync("src/icons/icons"),
  ],
  targets: ["esm", "cjs"],
  plugins: [multiInput(), commonjs(), image()],
});
