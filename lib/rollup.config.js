import withSolid from "rollup-preset-solid";
import { babel } from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';

export default withSolid({ plugins: [babel({ babelHelpers: "bundled" }), image()] });