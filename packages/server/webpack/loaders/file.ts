import path from 'path'
import { SRC_DIR } from '../env'

const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/

export default {
  client: {
    loader: 'url-loader',
    test: fileRegex,
    type: path.join(SRC_DIR, '../client/public/assets'),
  },
  server: {
    loader: 'null-loader',
    test: fileRegex,
  },
}
