import {join} from 'path';
const webpack = require('webpack'); //to access built-in plugins


const include = join(__dirname, 'src')

export default {
  mode: 'production',
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'spotifyWrapper',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {test: /\.jsx?$/, loader: 'babel-loader'},
    ]
  }
}
