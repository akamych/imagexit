import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IComment, IProps } from '../components/forum/forum.types'
import {
  IPropsDefault,
  apiBaseUrl,
  dataTestForumCommentList,
  dataTestForumTopicId,
  dataTestForumTopicList,
} from '../constants/data.forum'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
      // ---- body
      let bodySend = null
      if (method != 'GET') {
        bodySend = JSON.stringify(body)
      }

      // --- headers
      headersOn['Content-Type'] = 'application/json;charset=utf-8'
      const options: RequestInit = {
        method: method,
        headers: headersOn,
        body: bodySend,
      }

      try {
        setLoading(true) // loading start
        const response = await fetch(url, options)
        setLoading(false) // loading finish
        // ---
        if (response.status === 401) {
          navigate('/login') // редирект
        }

        if (response.ok) {
          const json = await response.json()
          return json
        }

        throw {
          name: response.status,
          message: response.status + ' ' + response.statusText,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setLoading(false) // loading finish
        console.error(e)
        throw e
      }
    },
    []
  )
  return { loading, request }
}

// ---------- Get Topic Content
export const apiGetTopicContent = () => {
  const [apiStatus, setApiStatus] = useState('') // ok|error|
  const [apiMessage, setApiMessage] = useState('')
  const [apiDataTopic, setApiData] = useState<IProps>(IPropsDefault)

  const textSuccess = ''
  // ----
  const { loading, request } = useHttp()
  // -------
  const apiResTopic = useCallback(
    async (id: number) => {
      const url = apiBaseUrl + '/' + id
      try {
        setApiStatus('')
        setApiMessage('')
        /* !!! API  - раскомментировать для получения реальных данных
        const res = await request(url)
        setApiData(res)
        console.log('apiGetTopicContent data', res)
        */
        setApiData(dataTestForumTopicId(id)) // ТЕСТОВЫЕ данные
        setApiStatus('ok')
        setApiMessage(textSuccess)
      } catch (e: any) {
        setApiStatus('error')
        setApiMessage(e.message)
        setApiData(IPropsDefault)
      }
    },
    [request]
  )
  return { loading, apiResTopic, apiDataTopic, apiStatus, apiMessage }
}

export const apiGetTopicList = () => {
  const [apiStatus, setApiStatus] = useState('') // ok|error|
  const [apiMessage, setApiMessage] = useState('')
  const [apiDataList, setApiData] = useState<IProps[]>([])

  const textSuccess = ''
  // ----
  const { loading, request } = useHttp()
  // -------
  const apiResList = useCallback(async () => {
    const url = apiBaseUrl + '/'
    console.log(url)
    try {
      setApiStatus('')
      setApiMessage('')
      /* !!! API  - раскомментировать для получения реальных данных 
      const res = await request(url)
      setApiData(res)
      console.log('apiGetTopicList data', res)
      */
      setApiData(dataTestForumTopicList) // !!! ТЕСТОВЫЕ данные
      setApiStatus('ok')
      setApiMessage(textSuccess)
    } catch (e: any) {
      setApiStatus('error')
      setApiMessage(e.message)
      setApiData([])
    }
  }, [request])
  return { loading, apiResList, apiDataList, apiStatus, apiMessage }
}

export const apiGetCommentList = () => {
  const [apiStatus, setApiStatus] = useState('') // ok|error|
  const [apiMessage, setApiMessage] = useState('')
  const [apiDataList, setApiData] = useState<IComment[]>([])

  const textSuccess = ''
  // ----
  const { loading, request } = useHttp()
  // -------
  const apiResList = useCallback(
    async (topicId: number) => {
      const url = apiBaseUrl + '/' + topicId
      try {
        /* !!! API  - раскомментировать для получения реальных данных
        const res = await request(url)
        setApiData(res)
        console.log('apiGetCommentList data', res)
        */
        setApiData(dataTestForumCommentList(topicId)) // ТЕСТОВЫЕ данные
        setApiStatus('ok')
        setApiMessage(textSuccess)
      } catch (e: any) {
        setApiStatus('error')
        setApiMessage(e.message)
        setApiData([])
      }
    },
    [request]
  )
  return { loading, apiResList, apiDataList, apiStatus, apiMessage }
}
// ---------- Get Comment List
/*
export const apiGetCommentListold = () => {
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
*/
