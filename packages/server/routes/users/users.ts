import { Request, Response } from 'express'
import User from '../../sequelize/models/user'
import { NullishPropertiesOf } from 'sequelize/types/utils'
import { Optional } from 'sequelize'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string
    if (email == undefined) {
      return []
    }
    //const commentId = parseInt(req.params.commentId, 10)
    const limit = parseInt(req.query.limit as string, 10) || 10
    const offset = parseInt(req.query.offset as string, 10) || 0

    const replies = await User.findAll({
      where: { email },
      limit,
      offset,
      order: [['id', 'DESC']],
    })

    return res.json(replies ? replies : [])
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10)
    const limit = parseInt(req.query.limit as string, 10) || 10
    const offset = parseInt(req.query.offset as string, 10) || 0

    const reply = await User.findOne({
      where: { id },
      limit,
      offset,
      order: [['id', 'DESC']],
    })

    if (!reply) {
      return res.status(404).json({ message: 'Not found' })
    }

    return res.json(reply)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    if (req.body.id !== res.locals.id) {
      // return res.status(403).json({ message: 'Forbidden' })
    }
    const userData: Partial<User> = {
      login: req.body.login,
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      displayName: req.body.displayName,
      phone: req.body.phone,
      avatar: req.body.avatar ? req.body.avatar : 'https://api.dicebear.com/7.x/miniavs/svg?seed=0',
      email: req.body.email,
      password: req.body.password,
    } as Optional<User, NullishPropertiesOf<User>>

    const newUser = new User(userData)

    // Устанавливаем значения для полей модели
    // newUser.set(req.body)

    // Валидируем значения полей модели
    await newUser.validate()

    // Сохраняем новый ответ в базе данных
    await newUser.save()

    return res.status(201).json(newUser)
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      // Обрабатываем ошибки валидации
      return res.status(400).json({ message: error.message })
    }

    // Обрабатываем другие ошибки
    return res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const reply = await User.findByPk(id)
    if (!reply) {
      return res.status(404).json({ message: 'Not found' })
    }
    // Проверяем что пользователь редактирует свой топик
    if (reply.id !== res.locals.id) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    // Проверяем, что обновляемые данные соответствуют модели ForumTopic
    reply.set(req.body)
    await reply.validate() // валидируем обновленные данные

    await reply.save() // сохраняем обновленные данные
    return res.json(reply)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

// curl -X DELETE http://localhost:3001/api/forum/topics/1
export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const reply = await User.findByPk(id)
    if (!reply) {
      return res.status(404).json({ message: 'Not found' })
    }
    // Проверяем что пользователь удаляет свой топик
    if (reply.id !== res.locals.id) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    await reply.destroy()
    return res.json({ message: 'Deleted' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
