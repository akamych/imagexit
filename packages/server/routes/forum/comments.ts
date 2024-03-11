import { Request, Response } from 'express'
import ForumComments from '../../sequelize/models/forumComments.model'

export const getComments = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.commentId, 10)
    const limit = parseInt(req.query.limit as string, 10) || 10
    const offset = parseInt(req.query.offset as string, 10) || 0

    const replies = await ForumComments.findAll({
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

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10)
    const limit = parseInt(req.query.limit as string, 10) || 10
    const offset = parseInt(req.query.offset as string, 10) || 0

    const reply = await ForumComments.findOne({
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

export const createComment = async (req: Request, res: Response) => {
  const commentId = parseInt(req.params.commentId, 10)

  try {
    // Проверяем что пользователь содает комментарий от своего имени
    if (req.body.userId !== res.locals.userId) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    const newComment = ForumComments.build({
      commentId,
      userId: req.body.userId,
      text: req.body.text,
      likeCount: 0,
    })

    // Устанавливаем значения для полей модели
    newComment.set(req.body)

    // Валидируем значения полей модели
    await newComment.validate()

    // Сохраняем новый ответ в базе данных
    await newComment.save()

    return res.status(201).json(newComment)
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      // Обрабатываем ошибки валидации
      return res.status(400).json({ message: error.message })
    }

    // Обрабатываем другие ошибки
    return res.status(500).json({ message: error.message })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const reply = await ForumComments.findByPk(id)
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' })
    }
    // Проверяем что пользователь редактирует свой комментарий

    if (reply.userId !== res.locals.userId) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    // Проверяем, что обновляемые данные соответствуют модели ForumComments
    reply.set(req.body)
    await reply.validate() // валидируем обновленные данные
    await reply.save() // сохраняем обновленные данные
    return res.json(reply)
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  try {
    const reply = await ForumComments.findByPk(id)
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' })
    }
    // Проверяем что пользователь удаляет свой комментарий
    if (reply.userId !== res.locals.userId) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    await reply.destroy()
    return res.json({ message: 'Reply deleted' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
