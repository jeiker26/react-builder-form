import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";

const env = process.env.NODE_ENV;

const config = {
  input: "src/index.js",
  output: {
    name: "ReactFormBuilder",
    file: "dist/react-form-builder.js",
    format: "umd"
  },
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  ]
};

export default config;
