import type { Request, Response } from 'express'
import { UserTheme, IUserTheme } from '../../models/user-theme'

export default async function getCurrentTheme(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  const { userId } = req.params

  try {
    const userTheme: IUserTheme | undefined = await UserTheme.findByPk(userId)

    if (userTheme) {
      return res.json(userTheme)
    } else {
      return res.status(404).send('User theme not found')
    }
  } catch (error) {
    console.error('Error finding user theme:', error)
    return res.status(500).send('Internal server error')
  }
}
