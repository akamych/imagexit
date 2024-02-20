import path from 'path'
import { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

import { IS_DEV, DIST_DIR, SRC_DIR } from './env'
import fileLoader from './loaders/file'
import cssLoader from './loaders/css'
import jsLoader from './loaders/js'

const config: Configuration = {
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.join(SRC_DIR, 'index'),
  module: {
    rules: [
      fileLoader.server,
      cssLoader.server,
      jsLoader.server,
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
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/static/',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.join(SRC_DIR, 'tsconfig.json') })],
  },

  devtool: 'source-map',

  performance: {
    hints: IS_DEV ? false : 'warning',
  },

  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

  optimization: { nodeEnv: false },
}

export default config
