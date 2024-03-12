import { Request, Response, NextFunction } from 'express'
import { getUserId } from '../repository/YandexAPIRepository'

const onlyAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userId = await getUserId(req.headers.cookie)
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    res.locals.userId = userId // добавляем userId в объект запроса
    next()
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}

export default onlyAuth
