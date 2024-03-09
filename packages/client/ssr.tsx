import React from 'react'
import { AppServer } from './src/App'
import { renderToString } from 'react-dom/server'

import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import store from './src/store/Store'
import { authAction } from './src/store/actions/AuthActions'

async function render(uri) {
  store.dispatch(authAction())

  const renderResult = renderToString(
    <Provider store={store}>
      <StaticRouter location={uri}>
        <AppServer />
      </StaticRouter>
    </Provider>
  )
  return [store.getState(), renderResult]
}

export { render }
