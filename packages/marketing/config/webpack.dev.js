const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    // insert bundled js to public/index.html
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

// merge common and dev Config (overriding common config if conflict)
module.exports = merge(commonConfig, devConfig);
