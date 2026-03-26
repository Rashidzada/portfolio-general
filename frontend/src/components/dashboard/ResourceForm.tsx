import type { ChangeEvent, FormEvent } from 'react'

import type { DashboardItem } from '../../types/api'
import type { DashboardCollections, DashboardFieldConfig, DashboardResourceConfig } from '../../types/dashboard'

function resolveOptions(field: DashboardFieldConfig, collections: DashboardCollections) {
  if (field.options) {
    return field.options
  }

  if (field.getOptions) {
    return field.getOptions(collections)
  }

  return []
}

export function ResourceForm({
  resource,
  values,
  selectedItem,
  collections,
  onFieldChange,
  onSubmit,
  onDelete,
  isSaving,
  error,
}: {
  resource: DashboardResourceConfig
  values: Record<string, unknown>
  selectedItem: DashboardItem | null
  collections: DashboardCollections
  onFieldChange: (fieldName: string, value: unknown) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onDelete: () => void
  isSaving: boolean
  error: string | null
}) {
  function renderField(field: DashboardFieldConfig) {
    const value = values[field.name]
    const previewUrl =
      selectedItem && field.previewKey ? String(selectedItem[field.previewKey] ?? '') : ''

    if (field.type === 'textarea' || field.type === 'list' || field.type === 'json') {
      return (
        <textarea
          key={field.name}
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => onFieldChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          rows={field.rows || 5}
          readOnly={field.readOnly}
          className="w-full rounded-[1.25rem] border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
        />
      )
    }

    if (field.type === 'checkbox') {
      return (
        <label key={field.name} className="flex items-center gap-3 rounded-[1.25rem] border border-[var(--line)] px-4 py-3">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) => onFieldChange(field.name, event.target.checked)}
            disabled={field.readOnly}
          />
          <span className="text-sm font-medium">{field.label}</span>
        </label>
      )
    }

    if (field.type === 'select') {
      const options = resolveOptions(field, collections)

      return (
        <select
          key={field.name}
          value={String(value ?? '')}
          onChange={(event) => onFieldChange(field.name, event.target.value)}
          disabled={field.readOnly}
          className="w-full rounded-[1.25rem] border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
        >
          <option value="">Select {field.label}</option>
          {options.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
      )
    }

    if (field.type === 'file') {
      return (
        <div key={field.name} className="rounded-[1.25rem] border border-[var(--line)] px-4 py-3">
          <input
            type="file"
            accept={field.accept}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onFieldChange(field.name, event.target.files?.[0] || null)
            }
            disabled={field.readOnly}
            className="w-full"
          />
          {previewUrl ? (
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-[var(--accent-strong)]"
            >
              View current file
            </a>
          ) : null}
        </div>
      )
    }

    return (
      <input
        key={field.name}
        type={field.type === 'number' ? 'number' : field.type}
        value={typeof value === 'string' || typeof value === 'number' ? value : ''}
        onChange={(event) => onFieldChange(field.name, event.target.value)}
        placeholder={field.placeholder}
        readOnly={field.readOnly}
        className="w-full rounded-[1.25rem] border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
      />
    )
  }

  return (
    <form onSubmit={onSubmit} className="glass-card rounded-[2rem] p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
            {selectedItem?.id ? `Edit ${resource.singular}` : `Create ${resource.singular}`}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">{resource.label}</h2>
        </div>
        {selectedItem?.id && resource.allowDelete !== false ? (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-500"
          >
            Delete
          </button>
        ) : null}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {resource.fields.map((field) => (
          <div key={field.name} className={field.type === 'textarea' || field.type === 'list' || field.type === 'json' || field.type === 'file' ? 'md:col-span-2' : ''}>
            <p className="mb-2 text-sm font-medium text-[var(--muted)]">{field.label}</p>
            {renderField(field)}
            {field.helperText ? <p className="mt-2 text-xs text-[var(--muted)]">{field.helperText}</p> : null}
          </div>
        ))}
      </div>

      {error ? <p className="mt-6 text-sm text-red-500">{error}</p> : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)] disabled:opacity-70"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
