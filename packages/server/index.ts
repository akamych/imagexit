import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import * as fs from 'fs'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { YandexAPIRepository } from './repository/YandexAPIRepository'
import { SSRModule } from './types'
import sequelize from './sequelize'
import themeRouter from './routes/theme'

const isDev = () => process.env.NODE_ENV === 'development'
dotenv.config()

async function startServer() {
  const app = express()
  app.use(cors())
  const port = 3001

  sequelize
    .sync()
    .then(() => console.log('Database connected successfully!'))
    .catch((error: Error) => console.error('Unable to connect to the database: ', error))

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs')

  let template: string
  template = fs.readFileSync(path.resolve(isDev() ? srcPath : distPath, 'index.html'), 'utf-8')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

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

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })
  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', cookieParser(), async (req, res, next) => {
    const url = req.originalUrl

    try {
      if (isDev()) {
        template = await vite!.transformIndexHtml(url, template)
      }

      let mod: SSRModule

      if (isDev()) {
        mod = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))) as SSRModule
      } else {
        mod = await import(ssrClientPath)
      }

      const { render } = mod
      const [initialState, appHtml] = await render(url, new YandexAPIRepository(req.headers['cookie']))

      const initStateSerialized = JSON.stringify(initialState)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace('<!--store-data-->', initStateSerialized)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
