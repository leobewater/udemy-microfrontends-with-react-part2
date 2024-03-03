// For Vue
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    // use file loader to load these file types
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: "file-loader" }],
      },
      {
        test: /\.vue$/i,
        use: "vue-loader",
      },
      {
        test: /\.scss|\.css$/i,
        use: ["vue-style-loader", "style-loader", "css-loader", "sass-loader"],
      },
      // process .mjs or .js by babel excluding node_modules folders
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    // insert bundled js to public/index.html
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // Vue plugin
    new VueLoaderPlugin(),
  ],
};
