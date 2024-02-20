import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import 'normalize.css'
import { BrowserRouter } from 'react-router-dom'
import { initStoreSSR } from './store/Store'
import { Provider } from 'react-redux'

function startServiceWorker() {
  if (process.env.NODE_ENV && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with  scope: ', registration.scope)
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error)
        })
    })
  }
}

startServiceWorker()

const domNode = document.getElementById('root')

if (domNode) {
  //@ts-ignore
  const store = initStoreSSR(window.__PRELOADED_STATE__)
  //@ts-ignore
  delete window.__PRELOADED_STATE__!

  hydrateRoot(
    domNode,
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}
