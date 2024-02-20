import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
// import { createClientAndConnect } from './db'
import serverRenderMiddleware from './middlewares/server-render-middleware'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

// createClientAndConnect()
app.use(express.static('dist'))

app.get('/*', serverRenderMiddleware)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
