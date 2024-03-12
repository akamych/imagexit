import { Request, Response } from 'express'
import UserTheme from '../../sequelize/models/user-theme'

// Получение текущей темы пользователя
export async function getTheme(req: Request, res: Response): Promise<void> {
  const userId = parseInt(req.params.userId) // Получаем идентификатор пользователя из запроса
  try {
    const userTheme = await UserTheme.findOne({ where: { ownerId: userId } }) // Находим тему пользователя по идентификатору
    if (!userTheme) {
      res.status(404).json({ error: 'Тема пользователя не найдена' })
    } else {
      res.json({ theme: userTheme.theme }) // Возвращаем текущую тему пользователя
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

// Установка новой темы пользователя
export async function setTheme(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId // Получаем идентификатор пользователя из запроса
  const theme: string = req.body.theme // Получаем новую тему из тела запроса

  try {
    const userTheme = await UserTheme.findOne({ where: { ownerId: userId } }) // Находим тему пользователя по идентификатору

    if (!userTheme) {
      // Создаем новую запись темы пользователя, если ее нет
      await UserTheme.create({ ownerId: userId, theme: theme } as UserTheme)
    } else {
      // Обновляем тему пользователя, если она уже существует
      userTheme.theme = theme
      await userTheme.save() // Сохраняем изменения
    }

    res.json({ message: 'Тема пользователя успешно обновлена' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

// Обновление темы пользователя
export async function updateTheme(req: Request, res: Response): Promise<void> {
  const userId = req.params.userId
  const newTheme: string = req.body.theme

  try {
    const userTheme = await UserTheme.findOne({ where: { ownerId: userId } })

    if (!userTheme) {
      res.status(404).json({ error: 'Тема пользователя не найдена' })
    } else {
      userTheme.theme = newTheme
      await userTheme.save()
      res.json({ message: 'Тема пользователя успешно обновлена' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}
