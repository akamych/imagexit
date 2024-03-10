import axios from 'axios'

const API_ROOT = 'https://ya-praktikum.tech/api/v2/'

const api = axios.create({
  baseURL: API_ROOT,
  withCredentials: true,
})

export class YandexAPIRepository {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrent(): Promise<any> {
    const { data } = await api.get(`${API_ROOT}/auth/user`, {
      headers: {
        cookie: this._cookieHeader,
      },
    })
    console.log('data', data)
    return {
      ...data,
      xss: "</script><script>alert('pwned')</script><!--",
    }
  }
}

export async function getUserId(cookieHeader: string | undefined) {
  if (!cookieHeader) {
    return cookieHeader
  }
  const repository = new YandexAPIRepository(undefined)
  try {
    const user = await repository.getCurrent()

    const userId = user.id
    console.log(`ID пользователя: ${userId}`)
    return userId
  } catch (error) {
    console.error(error)
  }
}
