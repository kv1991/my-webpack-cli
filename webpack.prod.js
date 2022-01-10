const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractorPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: '[name]-[contenthash].bundle.js'
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractorPlugin({
      filename: '[name]-[contenthash].css'
    })
  ]
});