import path from 'path'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { IS_DEV } = require('../env')

export default {
  client: {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'].filter(Boolean),
  },
  server: {
    test: /\.css$/,
    loader: 'null-loader',
  },
}
