import { API_CALLBACK_URL, API_OAUTH_YP_AUTH, API_OAUTH_YP_GET_SERVICE_ID } from '../constants/oauth'

type serviceIdType = {
  service_id: string
}

export const queryGetString = (params: Record<string, string>) =>
  Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

export const getServiceId = (): Promise<serviceIdType | void> =>
  fetch(API_OAUTH_YP_GET_SERVICE_ID)
    .then(response => {
      if (!response) {
        return
      }
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json() as Promise<serviceIdType>
    })
    .catch(error => {
      console.log(error)
      localStorage.removeItem('serviceId')
      throw new Error(error)
    })

export const oAuthRequest = async () => {
  getServiceId()
    .then(data => {
      if (!data) {
        return
      }
      const { service_id } = data
      localStorage.setItem('serviceId', service_id)
    })
    .catch(error => {
      console.log(error)
      localStorage.removeItem('serviceId')
    })
}

export const oAuthConfirmRequest = async (code: string) => {
  const body = {
    code,
    redirect_uri: API_CALLBACK_URL,
  }

  fetch(API_OAUTH_YP_AUTH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then()
    .catch(error => {
      console.error(error)
      localStorage.removeItem('serviceId')
    })
}
