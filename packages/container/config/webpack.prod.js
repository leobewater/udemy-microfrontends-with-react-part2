const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
// use package.json dependencies to import packages from other modules' packages
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    // set up the output files with cache hash
    filename: "[name].[contenthash].js",
    // match AWS S3/container/latest/ folder structure setting
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        // assume the remoteEntry is inside the "marketing" folder
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

// merge common and prod config (overriding common config if conflict)
module.exports = merge(commonConfig, prodConfig);
