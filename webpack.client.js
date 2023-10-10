const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isProduction } = require('./env');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const cssLoaderConfig = require('./_css-loader')[isProduction ? 'production' : 'development'];

/* const {baseConfig, publicPath, assetsPath, commonLoaders } = require('./webpack.base.js'); */

const config = {
  mode: 'development',
  // Tell webpack to root file of our server app
  entry: './src/client/client.js',

  // Tell webpack where to put output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  // devtool: isProduction ? 'nosources-source-map' : 'inline-source-map',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        /* use: [MiniCssExtractPlugin.loader, 'css-loader'] */
        use: [
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          /* // Creates `style` nodes from JS strings
          'style-loader', */
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|eot|otf|svg|png|woff2|woff|)$/,
        loader: 'file-loader?emitFile=false'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?emitFile=false'
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url-loader?emitFile=false'
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'file-loader?emitFile=false'
      }
      /*  {
        // XXX: Workaround for libsass bug that doesn't recognize ":global()".
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          cssLoaderConfig,
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: false,
              outputStyle: 'compressed'
            }
          }
        ])
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract([
          cssLoaderConfig,
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true,
              outputStyle: 'compressed'
            }
          }
        ])
      } */
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'main.css',
      chunkFilename: 'main.css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ]
  /* plugins: [
    new ExtractTextPlugin('stylesheets/main.css'),
    isProduction && new UglifyJSPlugin()
  ].filter(e => !!e) */
};

module.exports = merge(baseConfig, config);
