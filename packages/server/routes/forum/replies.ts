import { Request, Response } from 'express'
import ForumReplies from '../../sequelize/models/ForumReplies.model'

export const getReplies = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.commentId, 10)
    const limit = parseInt(req.query.limit as string, 10) || 10
    const offset = parseInt(req.query.offset as string, 10) || 0

    const replies = await ForumReplies.findAll({
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

export const getReplyById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10)
    const limit = parseInt(req.query.limit as string, 10) || 10
    const offset = parseInt(req.query.offset as string, 10) || 0

    const reply = await ForumReplies.findOne({
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

export const createReply = async (req: Request, res: Response) => {
  const commentId = parseInt(req.params.commentId, 10)

  try {
    const newReply = ForumReplies.build({
      commentId,
      userId: req.body.userId,
      text: req.body.text,
      likeCount: 0,
    })

    // Устанавливаем значения для полей модели
    newReply.set(req.body)

    // Валидируем значения полей модели
    await newReply.validate()

    // Сохраняем новый ответ в базе данных
    await newReply.save()

    return res.status(201).json(newReply)
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      // Обрабатываем ошибки валидации
      return res.status(400).json({ message: error.message })
    }

    // Обрабатываем другие ошибки
    return res.status(500).json({ message: error.message })
  }
}

export const updateReply = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const reply = await ForumReplies.findByPk(id)
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' })
    }

    // Проверяем, что обновляемые данные соответствуют модели ForumReplies
    reply.set(req.body)
    await reply.validate() // валидируем обновленные данные

    await reply.save() // сохраняем обновленные данные
    return res.json(reply)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteReply = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const reply = await ForumReplies.findByPk(id)
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' })
    }
    await reply.destroy()
    return res.json({ message: 'Reply deleted' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
