const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require("compression-webpack-plugin")
const SplitByPathPlugin = require("webpack-split-by-path")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AssetsManifestPlugin = require("webpack-assets-manifest")

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'client'),
  },
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].[hash:8].min.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]-[hash:8]',
                alias: {
                  assets: path.resolve(__dirname, 'assets'),
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss-ident',
                plugins: [
                  require('postcss-import')({
                    path: ['src'],
                  }),
                  require('postcss-cssnext')({
                    browsers: '>1%, last 4 versions, Firefox ESR, not ie < 9',
                  }),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.(ttf|otf|woff|woff2|svg|jpg|jpeg|png|webp)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/dist/assets/',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css',
      allChunks: true,
    }),
    new SplitByPathPlugin([
      {
        name: 'vendor',
        path: path.resolve(__dirname, 'node_modules'),
      },
    ], {
      manifest: 'entry',
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      test: /\.js/ ,
      filename: name => name.substring(0, name.length - 3),
    }),
    new AssetsManifestPlugin({
      output: path.resolve(__dirname, 'manifest.json'),
    }),
  ],
}
