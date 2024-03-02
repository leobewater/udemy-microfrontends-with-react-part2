const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
// use package.json dependencies to shared packages
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    // this avoid throwing 404 when using nested routes
    publicPath: "http://localhost:8082/",
  },
  devServer: {
    port: 8082,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap",
      },
      // may not want to use packageJson if you want to have total control then use [] or {}
      // see part1 code
      shared: packageJson.dependencies,
    }),
  ],
};

// merge common and dev Config (overriding common config if conflict)
module.exports = merge(commonConfig, devConfig);
