import { Request, Response } from 'express'
import ForumTopic from '../../sequelize/models/forumTopic.model'

export const getTopics = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.commentId, 10)
    const limit = parseInt(req.query.limit as string, 10) || 10
    const offset = parseInt(req.query.offset as string, 10) || 0

    const replies = await ForumTopic.findAll({
      where: { commentId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    })

    res.json(replies)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getTopicById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10)
    const limit = parseInt(req.query.limit as string, 10) || 10
    const offset = parseInt(req.query.offset as string, 10) || 0

    const reply = await ForumTopic.findOne({
      where: { id },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    })

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' })
    }

    return res.json(reply)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const createTopic = async (req: Request, res: Response) => {
  const commentId = parseInt(req.params.commentId, 10)

  try {
    const newTopic = ForumTopic.build({
      commentId,
      userId: req.body.userId,
      text: req.body.text,
      likeCount: 0,
    })

    // Устанавливаем значения для полей модели
    newTopic.set(req.body)

    // Валидируем значения полей модели
    await newTopic.validate()

    // Сохраняем новый ответ в базе данных
    await newTopic.save()

    return res.status(201).json(newTopic)
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      // Обрабатываем ошибки валидации
      return res.status(400).json({ message: error.message })
    }

    // Обрабатываем другие ошибки
    return res.status(500).json({ message: error.message })
  }
}

export const updateTopic = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const reply = await ForumTopic.findByPk(id)
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' })
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
export const deleteTopic = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const reply = await ForumTopic.findByPk(id)
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' })
    }
    await reply.destroy()
    return res.json({ message: 'Reply deleted' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
