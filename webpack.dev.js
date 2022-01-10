const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    host: 'localhost',
    static: [
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'public'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env'
                  ],
                ],
              },
            },
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env'
                  ],
                ],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env'
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      }
    ]
  }
});