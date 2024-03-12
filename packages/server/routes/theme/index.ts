import express from 'express'
import { getTheme, setTheme, updateTheme } from './themes'

const router = express.Router()

// Маршрут для получения текущей темы
router.get('/theme/:id', getTheme)
// Маршрут для установки новой темы
router.post('/theme/:id', setTheme)
// Маршрут для обновления темы
router.put('/theme/:id', updateTheme)

export default router
