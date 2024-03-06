import React from 'react'
import ReactDOM from 'react-dom/client'
import { useEffect } from 'react'
import './App.css'
import { Pages } from './layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { Provider } from 'react-redux'
import store from './store/Store'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className="App">
          Вот тут будет жить ваше приложение :)
          <Pages />
        </div>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
