import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'normalize.css'

function startServiceWorker() {
  // import.meta.env.PROD &&
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with  scope: ',
            registration.scope
          )
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error)
        })
    })
  }
}

startServiceWorker()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
