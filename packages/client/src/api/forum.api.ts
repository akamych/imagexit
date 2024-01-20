import { useCallback, useState } from 'react'
import {
  apiBaseUrl,
  dataTestForumCommentList,
  dataTestForumTopicId,
  dataTestForumTopicList,
} from '../constants/data.forum'

const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')

  /**
   * Асинхронная функция для отправки HTTP-запросов.
   * @param {string} url - URL-адрес для запроса.
   * @param {string} method - HTTP-метод (по умолчанию 'GET').
   * @param {Record<string, any>} body - Тело запроса (по умолчанию пустой объект).
   * @param {Record<string, string>} headersOn - Дополнительные заголовки запроса (по умолчанию пустой объект).
   */
  const request = useCallback(
    async (
      url: string,
      method = 'GET',
      body: Record<string, any> = {},
      headersOn: Record<string, string> = {}
    ) => {
      // заголовки
      headersOn['Content-Type'] = 'application/json;charset=utf-8'
      setError(null)
      setSuccess('')
      setLoading(true)

      try {
        let bodySend = null
        if (method != 'GET') {
          bodySend = JSON.stringify(body)
        }

        const options: RequestInit = {
          method: method,
          mode: 'cors',
          headers: headersOn,
          body: bodySend,
        }
        setLoading(false)

        const response = await fetch(url, options)

        if (response.ok) {
          const json = await response.json()
          setLoading(false)
          return json
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setLoading(false)
        setError(e)
        throw e
      }
    },
    []
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { loading, request, error, clearError, success }
}

// ---------- Get Topic Content
export const apiGetTopicContent = () => {
  // ----
  const textSuccess = 'Ok'
  const { loading, request, error } = useHttp()
  // ----
  // const { loading, request, error } = useHttp()
  const [success, setSuccess] = useState<string>('')
  // -------
  const response = useCallback(
    async (id: number) => {
      const url = apiBaseUrl + '/' + id
      try {
        // const data = await request(url)
        // console.log('apiGetTopicContent data', data)
        setSuccess(textSuccess)
        return dataTestForumTopicId(id)
      } catch (e: any) {
        console.log(e)
      }
    },
    [request]
  )
  return { loading, response, error, success }
}

// ---------- Get Topic List
export const apiGetTopicList = () => {
  // ----
  const url = apiBaseUrl + '/'
  const textSuccess = 'Ok'
  const { loading, request, error } = useHttp()
  // ----
  // const { loading, request, error } = useHttp()
  const [success, setSuccess] = useState<string>('')
  // -------
  const response = useCallback(async () => {
    try {
      // const data = await request(url)
      // console.log('apiGetTopicList data', data)
      setSuccess(textSuccess)
      return dataTestForumTopicList
    } catch (e: any) {
      console.log(e)
    }
  }, [request])
  return { loading, response, error, success }
}

// ---------- Get Comment List
export const apiGetCommentList = () => {
  // ----
  const textSuccess = 'Ok'
  const { loading, request, error } = useHttp()
  // ----
  // const { loading, request, error } = useHttp()
  const [success, setSuccess] = useState<string>('')
  // -------
  const response = useCallback(
    async (topicId: number) => {
      try {
        const url = apiBaseUrl + '/' + topicId
        // const data = await request(url)
        // console.log('apiGetCommentList data', data)
        setSuccess(textSuccess)
        return dataTestForumCommentList(topicId)
      } catch (e: any) {
        console.log(e)
      }
    },
    [request]
  )
  return { loading, response, error, success }
}
