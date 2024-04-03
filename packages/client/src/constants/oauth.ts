import { isDevelopment } from '../utils/EnvUtil'

export const API_OAUTH_YP_AUTH = 'https://ya-praktikum.tech/api/v2/oauth/yandex'
export const API_OAUTH_YP_GET_SERVICE_ID = 'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id'
export const API_OAUTH_YANDEX = 'https://oauth.yandex.ru/authorize'
export const API_CALLBACK_URL = isDevelopment ? 'http://localhost:3000' : 'https://imagexit-web-client.vercel.app'
