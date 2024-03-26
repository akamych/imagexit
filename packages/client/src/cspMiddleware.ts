import type { IncomingMessage, ServerResponse } from 'http'

type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void

const cspMiddleware: Middleware = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self' process.env.SERVER_PORT; script-src 'self' 'unsafe-inline' process.env.SERVER_PORT; style-src 'self' 'unsafe-inline' process.env.SERVER_PORT; img-src 'self' process.env.SERVER_PORT data:; font-src 'self' process.env.SERVER_PORT data:; connect-src 'self' process.env.SERVER_PORT; frame-ancestors 'self' process.env.SERVER_PORT;`
  )
  next()
}

export default cspMiddleware
