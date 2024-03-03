const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
// use package.json dependencies to shared packages
const packageJson = require("../package.json");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    // match AWS S3/dashboard/latest/ folder structure setting
    publicPath: "/dashboard/latest/",
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

// merge common and prod config (overriding common config if conflict)
module.exports = merge(commonConfig, prodConfig);
