const { override, addWebpackResolve } = require("customize-cra");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = override(
  addWebpackResolve({
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  })
);