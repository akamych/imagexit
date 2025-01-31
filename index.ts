import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: path.join(__dirname, '../..', '.env') })

import express from 'express'

import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { YandexAPIRepository } from './packages/server/repository/YandexAPIRepository'
// import sequelize from './packages/server/sequelize'
import themeRouter from './packages/server/routes/theme'
import ForumRouter from './packages/server/routes/forum'
import sequelize from './packages/server/sequelize'

dotenv.config()

async function startServer() {
  const app = express()
  app.use(cors())
  const port = 3001

  sequelize
    .sync()
    .then(() => console.log('Database connected successfully!'))
    .catch((error: Error) => console.error('Unable to connect to the database: ', error))

  const distPath = './vercel-dist'
  const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')

  app.use(express.json())
  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  )

  app.use('/api/theme', themeRouter)

  app.use('/api/forum', ForumRouter)

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.use('/assets', express.static(path.resolve(distPath, 'assets')))

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl

    try {
      const ssrClientPath = './vercel-ssr-dist/ssr.cjs'
      const mod = await import(ssrClientPath)

      const { render } = mod
      const [initialState, appHtml] = await render(url, new YandexAPIRepository(req.headers['cookie']))

      const initStateSerialized = JSON.stringify(initialState)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace('<!--store-data-->', initStateSerialized)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()

// import express from 'express'
//
// // Middlewares
// const app = express()
// app.use(express.json())
//
// // Routes
// app.get('/', (_, res) => {
//   res.json('👋 Howdy from the server :)')
// })
//
// // connection
// const port = process.env.PORT || 9001
// app.listen(port, () => console.log(`Listening to port ${port}`))
