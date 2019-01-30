const webpack = require("webpack"); // eslint-disable-line
const path = require("path");

const config = {
  entry: "./example/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
};
module.exports = config;
