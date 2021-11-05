import withSolid from "rollup-preset-solid";
import { babel } from "@rollup/plugin-babel";
import image from "@rollup/plugin-image";
import commonjs from "@rollup/plugin-commonjs";

export default withSolid({
  plugins: [babel({ babelHelpers: "bundled" }), commonjs(), image()],
});
