const { isProduction } = require('./env');
const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const cssLoaderConfig = require('./_css-loader')[isProduction ? 'production' : 'development'];

// const {baseConfig, publicPath, assetsPath, commonLoaders } = require('./webpack.base.js');
const baseConfig = require('./webpack.base.js');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  mode: 'development',

  // Tell webpack the root file of our
  // server application
  entry: './src/index.js',
  // We don't serve bundle.js for server, so we can use dynamic external imports
  externals: [webpackNodeExternals()],

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /* {
        test: /\.sass$/,
        loaders: [cssLoaderConfig, 'sass-loader']
      },  */
      {
        test: /\.(css)$/,
        loader: 'css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'css-loader'
      },
      /* {
        test: /\.css$/, 
        use: [MiniCssExtractPlugin.loader, 'css-loader']
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },  */
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
    ]
  }
  /* module: {
    loaders: commonLoaders.concat([
      {
        test: /\.css$/,
        loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ])
  } */
};

module.exports = merge(baseConfig, config);
