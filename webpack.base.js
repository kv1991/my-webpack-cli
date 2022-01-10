const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractorPlugin = require('mini-css-extract-plugin');

console.log('__dirname: ', __dirname);

module.exports = {
  entry: {
    index: './src/index.js',
    test: './src/test.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.css', '.less', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      chunk: ['index', 'test']
    }),
    new MiniCssExtractorPlugin({
      filename: 'css/[name]-[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/i,
        type: 'asset/resource'
      }
    ]
  }
}