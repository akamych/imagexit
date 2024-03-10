import dotenv from 'dotenv'
import cors from 'cors'
import { getTheme, setTheme } from './api/themes'
dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

// Получение текущей темы пользователя
app.get('/api/theme/:userId', getTheme)

// Обновление темы пользователя
app.post('/api/theme/:userId', setTheme)

createClientAndConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
