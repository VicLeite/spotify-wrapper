const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'SpotifyWrapper',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
