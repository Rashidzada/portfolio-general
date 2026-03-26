import { apiClient } from './client'
import type {
  AuthTokens,
  ContactFormPayload,
  ContactMessage,
  CurrentUser,
  DashboardItem,
  DashboardOverview,
  LandingPayload,
} from '../types/api'

export async function fetchLandingData() {
  const { data } = await apiClient.get<LandingPayload>('/landing/')
  return data
}

export async function submitContactForm(payload: ContactFormPayload) {
  const { data } = await apiClient.post('/contact/', payload)
  return data
}

export async function loginAdmin(username: string, password: string) {
  const { data } = await apiClient.post<AuthTokens>('/auth/token/', { username, password })
  return data
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get<CurrentUser>('/auth/me/')
  return data
}

export async function createAdminSession() {
  const { data } = await apiClient.post<{ admin_url: string }>(
    '/auth/admin-session/',
    {},
    { withCredentials: true },
  )
  return data
}

export async function fetchDashboardOverview() {
  const { data } = await apiClient.get<DashboardOverview>('/dashboard/overview/')
  return data
}

export async function fetchDashboardMessages() {
  const { data } = await apiClient.get<ContactMessage[]>('/dashboard/messages/')
  return data
}

export async function fetchDashboardCollection(endpoint: string) {
  const { data } = await apiClient.get<DashboardItem[]>(endpoint)
  return data
}

export async function createDashboardItem(endpoint: string, payload: FormData | Record<string, unknown>) {
  const { data } = await apiClient.post<DashboardItem>(endpoint, payload)
  return data
}

export async function updateDashboardItem(
  endpoint: string,
  id: number,
  payload: FormData | Record<string, unknown>,
) {
  const { data } = await apiClient.put<DashboardItem>(`${endpoint}${id}/`, payload)
  return data
}

export async function deleteDashboardItem(endpoint: string, id: number) {
  await apiClient.delete(`${endpoint}${id}/`)
}
