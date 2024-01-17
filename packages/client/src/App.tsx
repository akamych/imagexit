import { useEffect } from 'react'
import './App.css'
import { Pages } from './layout/Layout'
import { BrowserRouter } from 'react-router-dom'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        Вот тут будет жить ваше приложение :)
        <Pages />
      </div>
    </BrowserRouter>
  )
}

export default App
