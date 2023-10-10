const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'development',
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: false
      })
    ]
    /*,
     splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    } */
  },
  // Tell webpack to root file of our server app
  entry: './src/client/client.js',

  // Tell webpack where to put output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
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
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'main.css',
      chunkFilename: 'main.css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    })
  ]
};

module.exports = merge(baseConfig, config);
