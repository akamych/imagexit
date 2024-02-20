import path from 'path'
import webpack, { Configuration } from 'webpack'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { IS_DEV, DIST_DIR, SRC_DIR } from './env'

import fileLoader from './loaders/file'
import cssLoader from './loaders/css'
import jsLoader from './loaders/js'

const config: Configuration = {
  target: 'web',
  entry: path.join(SRC_DIR, '../client/src/main.tsx'),
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.join(SRC_DIR, '../client/src'),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.join(SRC_DIR, '../client/public/assets/images'),
      },
      fileLoader.client,
      cssLoader.client,
      jsLoader.client,
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    modules: ['src', 'node_modules', path.resolve('../../node_modules'), path.resolve('../../client')],
    alias: {},
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.join(SRC_DIR, '../client/tsconfig.json') })],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
  devtool: 'source-map',

  performance: {
    hints: IS_DEV ? false : 'warning',
  },
}

export default config
