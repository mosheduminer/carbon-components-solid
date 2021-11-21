import withSolid from "rollup-preset-solid";
import image from "@rollup/plugin-image";
import commonjs from "@rollup/plugin-commonjs";

export default withSolid({
  input: "src/index.ts",
  plugins: [commonjs(), image()],
});
