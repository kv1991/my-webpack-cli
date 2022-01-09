const { merge } = require('webpack-merge');
const { CleanWebpackPlugin  } = require('clean-webpack-plugin');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: '[name]-[contenthash].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
});