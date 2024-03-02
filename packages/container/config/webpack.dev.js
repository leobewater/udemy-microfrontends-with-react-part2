const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
// use package.json dependencies to import packages from other modules' packages
const packageJson = require('../package.json')

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
    // insert bundled js to public/index.html
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

// merge common and dev Config (overriding common config if conflict)
module.exports = merge(commonConfig, devConfig);
