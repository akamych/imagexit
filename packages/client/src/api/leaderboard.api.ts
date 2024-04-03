import { ILeaderboardUser, ILeaderboardResponse, ILeaderboardPostData } from '../types/leaderboard.types'
import { GET_LEADERBOARD_URL, POST_LEADERBOARD_URL } from '../constants/swagger.api'
import { SCORE_LABEL } from '../constants/common'

export async function fetchLeaderboardData(): Promise<ILeaderboardUser[]> {
  try {
    const response = await fetch(GET_LEADERBOARD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ratingFieldName: SCORE_LABEL,
        cursor: 0,
        limit: 10,
      }),
    })

    if (!response.ok) {
      throw new Error('Не удалось загрузить список лидеров')
    }

    const data = await response.json()

    // Приводим полученные данные к интерфейсу ILeaderboardUser
    const leaderboardUsers: ILeaderboardUser[] = data.map((item: ILeaderboardResponse, index: number) => ({
      id: item.data.id || 0,
      login: item.data.login || '',
      avatar: item.data.avatar || '',
      points: item.data[SCORE_LABEL] || 0,
      position: index + 1,
    }))

    return leaderboardUsers
  } catch (error) {
    console.error('Не удалось загрузить список лидеров', error)
    return []
  }
}

export async function postDataToLeaderboard(data: ILeaderboardPostData): Promise<void> {
  try {
    const response = await fetch(POST_LEADERBOARD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Не удалось обновить список лидеров')
    }
  } catch (error) {
    console.error('Ошибка записи данных в список лидеров', error)
  }
}
