import { ILeaderboardUser } from '../types/leaderboard.types'
import { GET_LEADERBOARD_URL, POST_LEADERBOARD_URL, RESOURCES } from '../constants/swagger.api'

export async function fetchLeaderboardData(): Promise<ILeaderboardUser[]> {
  try {
    const response = await fetch(GET_LEADERBOARD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ratingFieldName: 'theBeatlesTotalScore',
        cursor: 0,
        limit: 10,
      }),
    })

    if (!response.ok) {
      throw new Error('Не удалось загрузить список лидеров')
    }

    const data = await response.json()

    // Приводим полученные данные к интерфейсу ILeaderboardUser
    const leaderboardUsers: ILeaderboardUser[] = data.map((item: any, index: number) => ({
      id: item.data.id || 0,
      login: item.data.login || '',
      avatar: RESOURCES + item.data.avatar || '',
      points: item.data.theBeatlesTotalScore || 0,
      position: index + 1,
    }))

    return leaderboardUsers
  } catch (error) {
    console.error('Не удалось загрузить список лидеров', error)
    return []
  }
}

export async function postDataToLeaderboard(data: any): Promise<void> {
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

    console.log('Список лидеров обновлен успешно')
  } catch (error) {
    console.error('Ошибка записи данных в список лидеров', error)
  }
}
