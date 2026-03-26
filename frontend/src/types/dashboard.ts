import type { DashboardItem } from './api'

export interface DashboardFieldOption {
  label: string
  value: string | number
}

export interface DashboardFieldConfig {
  name: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'email' | 'url' | 'checkbox' | 'date' | 'select' | 'list' | 'json' | 'file'
  placeholder?: string
  rows?: number
  accept?: string
  options?: DashboardFieldOption[]
  getOptions?: (collections: DashboardCollections) => DashboardFieldOption[]
  readOnly?: boolean
  previewKey?: string
  helperText?: string
  defaultValue?: unknown
}

export interface DashboardResourceConfig {
  key: string
  label: string
  singular: string
  endpoint: string
  titleKey: string
  descriptionKey?: string
  allowCreate?: boolean
  allowDelete?: boolean
  fields: DashboardFieldConfig[]
}

export type DashboardCollections = Record<string, DashboardItem[]>
