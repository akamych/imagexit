import MiniCssExtractPlugin from 'mini-css-extract-plugin'

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
