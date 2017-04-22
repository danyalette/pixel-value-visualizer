var path = require("path")
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname,

  entry: './src/js/index',

  output: {
      path: path.resolve('./dist/'),
      filename: "[name].js",
  },
  plugins: [
    new ExtractTextPlugin( "main.css" )
  ],
  module: {
    loaders: [
      {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            query:
              {
                presets:['es2015', 'es2016', 'es2017'],
                "plugins": [
                  "syntax-async-functions",
                  "transform-object-rest-spread"
                ]
              }
          },

      },
      {
          test: /\.s?css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 3
                }
              },
              {
                loader: 'postcss-loader'
              },
              {
                loader: 'sass-loader'
              }
            ]
          }),

      }
    ],
  }
}