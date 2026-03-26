const ACCESS_TOKEN_KEY = 'portfolio_access_token'
const REFRESH_TOKEN_KEY = 'portfolio_refresh_token'
const THEME_KEY = 'portfolio_theme'

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(access: string, refresh: string) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, access)
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

export function clearTokens() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function getStoredTheme() {
  return window.localStorage.getItem(THEME_KEY)
}

export function setStoredTheme(theme: string) {
  window.localStorage.setItem(THEME_KEY, theme)
}
