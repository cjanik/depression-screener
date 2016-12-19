const webpack = require('webpack');
let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: true,
    mangle: false,
    comments: false
  })
];

module.exports = {
  entry: {
    'default': './src/client.js',
  },
  output: {
    path: './src/static/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'react'
          ],
          plugins: [
            'transform-object-rest-spread',
            'transform-function-bind'
          ]
        }
      }
    ]
  },
  plugins: plugins
};
