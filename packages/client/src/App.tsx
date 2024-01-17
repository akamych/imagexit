import { useEffect } from 'react'
import './App.css'
import { Pages } from './layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/Store'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      // после подключения сервера раскомментировать const url = `http://localhost:${__SERVER_PORT__}`
      const url = `http://localhost`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Provider store={store}>
        <div className="App">
          Вот тут будет жить ваше приложение :)
          <Pages />
        </div>
      </Provider>
=======
      <div className="App">
        Вот тут будет жить ваше приложение :)
        <Pages />
      </div>
>>>>>>> 6189eec (Фикс для jest)
    </BrowserRouter>
  )
}

export default App
