import type { DashboardItem } from '../types/api'
import type { DashboardFieldConfig, DashboardResourceConfig } from '../types/dashboard'

function normalizeDefaultValue(field: DashboardFieldConfig) {
  if (field.defaultValue !== undefined) {
    return field.defaultValue
  }

  if (field.type === 'checkbox') {
    return false
  }

  if (field.type === 'json') {
    return '[]'
  }

  return ''
}

export function createEmptyDashboardForm(resource: DashboardResourceConfig) {
  const values: Record<string, unknown> = {}

  for (const field of resource.fields) {
    values[field.name] = normalizeDefaultValue(field)
  }

  return values
}

export function createDashboardFormValues(resource: DashboardResourceConfig, item: DashboardItem | null) {
  const values = createEmptyDashboardForm(resource)

  if (!item) {
    return values
  }

  for (const field of resource.fields) {
    const currentValue = item[field.name]

    if (field.type === 'list') {
      values[field.name] = Array.isArray(currentValue) ? currentValue.join('\n') : ''
      continue
    }

    if (field.type === 'json') {
      values[field.name] = currentValue ? JSON.stringify(currentValue, null, 2) : '[]'
      continue
    }

    if (field.type === 'checkbox') {
      values[field.name] = Boolean(currentValue)
      continue
    }

    if (field.type === 'file') {
      values[field.name] = null
      continue
    }

    values[field.name] = currentValue ?? normalizeDefaultValue(field)
  }

  return values
}

export function buildDashboardPayload(
  resource: DashboardResourceConfig,
  values: Record<string, unknown>,
) {
  const payload: Record<string, unknown> = {}

  for (const field of resource.fields) {
    const value = values[field.name]

    if (field.type === 'file') {
      if (value instanceof File) {
        payload[field.name] = value
      }
      continue
    }

    if (field.type === 'list') {
      if (typeof value === 'string') {
        payload[field.name] = value
          .split('\n')
          .map((entry) => entry.trim())
          .filter(Boolean)
      } else {
        payload[field.name] = []
      }
      continue
    }

    if (field.type === 'json') {
      if (typeof value === 'string' && value.trim()) {
        payload[field.name] = JSON.parse(value)
      } else {
        payload[field.name] = []
      }
      continue
    }

    if (field.type === 'number') {
      payload[field.name] = value === '' || value === null ? null : Number(value)
      continue
    }

    if (field.type === 'checkbox') {
      payload[field.name] = Boolean(value)
      continue
    }

    payload[field.name] = value ?? ''
  }

  return payload
}

export function buildDashboardRequestBody(payload: Record<string, unknown>) {
  const hasFile = Object.values(payload).some((value) => value instanceof File)

  if (!hasFile) {
    return payload
  }

  const formData = new FormData()

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) {
      continue
    }

    if (value instanceof File) {
      formData.append(key, value)
      continue
    }

    if (Array.isArray(value) || (value && typeof value === 'object')) {
      formData.append(key, JSON.stringify(value))
      continue
    }

    formData.append(key, value === null ? '' : String(value))
  }

  return formData
}

export function dashboardItemTitle(item: DashboardItem, resource: DashboardResourceConfig) {
  return String(item[resource.titleKey] ?? resource.singular)
}

export function dashboardItemDescription(item: DashboardItem, resource: DashboardResourceConfig) {
  if (!resource.descriptionKey) {
    return ''
  }

  return String(item[resource.descriptionKey] ?? '')
}
