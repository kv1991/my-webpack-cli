const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractorPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HappyPack = require('happypack');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const RemoveConsoleWebpackPlugin = require('./src/custom-webpack-plugins/remove-consoles-webpack-plugin');

const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/[name]-[contenthash].bundle.js',
    assetModuleFilename: 'media/[hash][ext][query]'
  },
  // externals: {
  //   Vue: 'vue',
  //   VueRouter: 'vue-router',
  //   // $router: 'vue-router'
  // },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          minChunks: 2
        },
        reactBase: {
          name: 'react.base',
          chunks: 'initial',
          test: module => /react/.test(module.context),
          priority: 10
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractorPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          { loader: MiniCssExtractorPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractorPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractorPlugin({
      filename: '[name]-[contenthash].css'
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new HappyPack({
      loaders: ['babel-loader?presets[]=es2015']
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)$/,
          options: {
            quality: 60,
          }
        }
      ],
      overrideExtension: false,
      detailedLogs: true,
      strict: false
    }),
    new RemoveConsoleWebpackPlugin()
  ]
});