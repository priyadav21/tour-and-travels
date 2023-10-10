const path = require('path');
module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    // publicPath: '/assets/',
    // assetsPath: path.join(__dirname, '..', 'dist', 'assets'),
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        /* resolve: {
          extensions: ['.js', 'jsx', '.tsx', '.ts']
        }, */
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      }
    ]
  }
};
