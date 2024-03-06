import { useEffect } from 'react'
import './App.css'
import { Pages } from './layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { Provider } from 'react-redux'
import store from './store/Store'
import { oAuthRequest } from './api/oauth.api'

function App() {
  useEffect(() => {
    oAuthRequest()
  }, [])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <div className="hidden">Вот тут будет жить ваше приложение :)</div>
            <Pages />
          </div>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export function AppServer() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
    oAuthRequest()
  }, [])

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="App">
          <div className="hidden">Вот тут будет жить ваше приложение :)</div>
          <Pages />
        </div>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
