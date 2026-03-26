import axios from 'axios'

import { clearTokens, getAccessToken, getRefreshToken, setTokens } from '../utils/storage'

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
export const API_BASE_URL = rawBaseUrl.replace(/\/$/, '')

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

export function applyAccessToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    return
  }
  delete apiClient.defaults.headers.common.Authorization
}

applyAccessToken(getAccessToken())

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const refreshToken = getRefreshToken()

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        })

        setTokens(refreshResponse.data.access, refreshToken)
        applyAccessToken(refreshResponse.data.access)
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`

        return apiClient(originalRequest)
      } catch {
        clearTokens()
        applyAccessToken(null)
      }
    }

    return Promise.reject(error)
  },
)
