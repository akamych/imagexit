import { Request, Response } from 'express'
import ForumTopicEmojis from '../../sequelize/models/forumTopicEmojis.model'
import { emojiResponseMapper } from '../../utils/emoji'

export const getEmojisByTopicId = async (req: Request, res: Response) => {
  try {
    const topicId = parseInt(req.params.id, 10)

    const replies = await ForumTopicEmojis.findAll({
      where: { topicId: topicId },
      order: [['clicks', 'DESC']],
    })

    res.json(emojiResponseMapper(replies))
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const addTopicEmoji = async (req: Request, res: Response) => {
  const id: number = parseInt(req.body.id, 10)
  const emoji: string = req.body.emoji
  try {
    const reply = await ForumTopicEmojis.findOne({
      where: { topicId: id, code: emoji },
    })
    if (!reply) {
      await ForumTopicEmojis.create({
        topicId: id,
        code: emoji,
        clicks: 1,
      })
    } else {
      reply.update({ clicks: reply.clicks + 1 })
      await reply.validate()
      await reply.save()
    }

    const replies = await ForumTopicEmojis.findAll({
      where: { topicId: id },
      order: [['clicks', 'DESC']],
    })

    return res.json(emojiResponseMapper(replies))
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}
