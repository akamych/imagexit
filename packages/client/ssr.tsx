import React from 'react'
import { AppServer } from './src/App'
import { renderToString } from 'react-dom/server'

import { StaticRouter } from 'react-router-dom/server'

async function render(uri) {
  const renderResult = renderToString(
    <StaticRouter location={uri}>
      <AppServer />
    </StaticRouter>
  )
  return [renderResult]
}

export { render }
