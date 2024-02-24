import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import 'normalize.css'

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
  hydrateRoot(
    domNode,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
