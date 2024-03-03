const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
// use package.json dependencies to shared packages
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    // this avoid throwing 404 when using nested routes
    publicPath: "http://localhost:8083/",
  },
  devServer: {
    port: 8083,
    historyApiFallback: true,
    // For Cors
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap",
      },
      // may not want to use packageJson if you want to have total control then use [] or {}
      // see part1 code
      shared: packageJson.dependencies,
    }),
  ],
};

// merge common and dev Config (overriding common config if conflict)
module.exports = merge(commonConfig, devConfig);
