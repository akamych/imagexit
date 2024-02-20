import React, { useEffect } from 'react'
import './App.css'
import { Pages } from './layout/Layout'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { useSelector } from 'react-redux'

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        Вот тут будет жить ваше приложение :)
        <Pages />
      </div>
    </ErrorBoundary>
  )
}

export default App
