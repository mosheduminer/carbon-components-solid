import fs from "fs";
import gracefulFs from "graceful-fs";
gracefulFs.gracefulify(fs);
import withSolid from "./withSolid";
import image from "@rollup/plugin-image";
import commonjs from "@rollup/plugin-commonjs";
import multiInput from "rollup-plugin-multi-input";
import { resolve } from "path";

const subFolders = [
  "src/UIShell",
  "src/DataTable",
  "src/icons",
]

const programRoots = []

for (const subFolder of subFolders) {
  programRoots.push(...fs.readdirSync(subFolder).map((path) => resolve(subFolder, path)));
}

export default withSolid({
  input: ["src/**/*.ts*"],
  tsProgramRoots: [
    resolve("src/index.ts"),
    ...programRoots,
  ],
  targets: ["esm", "cjs"],
  plugins: [multiInput(), commonjs(), image()],
});
