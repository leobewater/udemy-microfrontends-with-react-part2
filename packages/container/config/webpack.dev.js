const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
// use package.json dependencies to import packages from other modules' packages
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    // this avoid throwing 404 when using nested routes
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

// merge common and dev Config (overriding common config if conflict)
module.exports = merge(commonConfig, devConfig);
