import React from 'react'
import { renderToString } from 'react-dom/server'
import { Request, Response } from 'express'
import App from 'client/src/App'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import store from '../../client/src/store/Store'
import { authAction } from 'client/src/store/actions/AuthActions'

export default (req: Request, res: Response) => {
  store.dispatch(authAction())

  const jsx = (
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  )
  const reactHtml = renderToString(jsx)
  const preloadedState = store.getState()

  res.send(getHtml(reactHtml, preloadedState))
}

function getHtml(reactHtml: string, preloadedState = {}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.jpg">
        <title>Sneakers shop</title>
        <link href="/main.css" rel="stylesheet">
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/usage/server-rendering#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/main.js"></script>
    </body>
    </html>
    `
}
