import axios from 'axios'
import { ArrowUpRight, Database, LayoutPanelTop, MessageSquareText, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { API_BASE_URL } from '../api/client'
import {
  createAdminSession,
  createDashboardItem,
  deleteDashboardItem,
  fetchCurrentUser,
  fetchDashboardCollection,
  fetchDashboardOverview,
  updateDashboardItem,
} from '../api/portfolio'
import { ResourceForm } from '../components/dashboard/ResourceForm'
import { StatCard } from '../components/dashboard/StatCard'
import { Loader } from '../components/ui/Loader'
import { LoadingOverlay } from '../components/ui/LoadingOverlay'
import { ToastStack, type ToastNotice } from '../components/ui/ToastStack'
import { DASHBOARD_RESOURCES } from '../dashboard/resourceDefinitions'
import { DashboardLayout } from '../layouts/DashboardLayout'
import type { CurrentUser, DashboardItem, DashboardOverview } from '../types/api'
import type { DashboardCollections, DashboardResourceConfig } from '../types/dashboard'
import { clearTokens } from '../utils/storage'
import {
  buildDashboardPayload,
  buildDashboardRequestBody,
  createDashboardFormValues,
  createEmptyDashboardForm,
  dashboardItemDescription,
  dashboardItemTitle,
} from '../utils/dashboard'

function getResource(resourceKey: string) {
  return DASHBOARD_RESOURCES.find((resource) => resource.key === resourceKey) || DASHBOARD_RESOURCES[0]
}

function formatDashboardError(data: unknown): string {
  if (typeof data === 'string') {
    return data
  }

  if (Array.isArray(data)) {
    return data.map((item) => formatDashboardError(item)).filter(Boolean).join(' ')
  }

  if (data && typeof data === 'object') {
    return Object.entries(data as Record<string, unknown>)
      .map(([key, value]) => `${key}: ${formatDashboardError(value)}`)
      .join(' | ')
  }

  return 'Please review the form values and try again.'
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [overview, setOverview] = useState<DashboardOverview | null>(null)
  const [collections, setCollections] = useState<DashboardCollections>({})
  const [activeResourceKey, setActiveResourceKey] = useState(DASHBOARD_RESOURCES[0].key)
  const [selectedItem, setSelectedItem] = useState<DashboardItem | null>(null)
  const [formValues, setFormValues] = useState<Record<string, unknown>>(createEmptyDashboardForm(DASHBOARD_RESOURCES[0]))
  const [error, setError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isOpeningAdmin, setIsOpeningAdmin] = useState(false)
  const [toasts, setToasts] = useState<ToastNotice[]>([])

  function dismissToast(id: number) {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }

  function pushToast(variant: ToastNotice['variant'], title: string, message?: string) {
    const id = Date.now() + Math.floor(Math.random() * 1000)

    setToasts((currentToasts) => [...currentToasts, { id, title, message, variant }])

    window.setTimeout(() => {
      dismissToast(id)
    }, 3600)
  }

  function applySelection(
    resourceKey: string,
    nextCollections: DashboardCollections,
    preferredItemId?: number | null,
    createNew?: boolean,
  ) {
    const resource = getResource(resourceKey)
    const resourceItems = nextCollections[resource.key] || []

    setActiveResourceKey(resource.key)

    if (createNew) {
      setSelectedItem(null)
      setFormValues(createEmptyDashboardForm(resource))
      setFormError(null)
      return
    }

    let nextItem: DashboardItem | null = null

    if (preferredItemId) {
      nextItem =
        resourceItems.find((item) => Number(item.id) === preferredItemId) ||
        null
    }

    if (!nextItem) {
      nextItem = resourceItems[0] || null
    }

    setSelectedItem(nextItem)
    setFormValues(createDashboardFormValues(resource, nextItem))
    setFormError(null)
  }

  useEffect(() => {
    let mounted = true

    async function loadDashboard() {
      try {
        const [currentUser, dashboardOverview, ...resourcePayloads] = await Promise.all([
          fetchCurrentUser(),
          fetchDashboardOverview(),
          ...DASHBOARD_RESOURCES.map((resource) => fetchDashboardCollection(resource.endpoint)),
        ])

        if (!mounted) {
          return
        }

        const nextCollections: DashboardCollections = {}
        DASHBOARD_RESOURCES.forEach((resource, index) => {
          nextCollections[resource.key] = resourcePayloads[index]
        })

        setUser(currentUser)
        setOverview(dashboardOverview)
        setCollections(nextCollections)
        applySelection(DASHBOARD_RESOURCES[0].key, nextCollections)
      } catch (caughtError) {
        if (
          axios.isAxiosError(caughtError) &&
          (caughtError.response?.status === 401 || caughtError.response?.status === 403)
        ) {
          clearTokens()
          navigate('/admin/login', { replace: true })
          return
        }

        if (mounted) {
          setError('The dashboard could not load. Check authentication and the dashboard API endpoints.')
          pushToast(
            'error',
            'Dashboard load failed',
            'Authentication may have expired, or one of the dashboard API routes is unavailable.',
          )
        }
      }
    }

    void loadDashboard()

    return () => {
      mounted = false
    }
  }, [navigate])

  const activeResource = getResource(activeResourceKey)
  const activeItems = collections[activeResource.key] || []
  const backendBase = API_BASE_URL.replace(/\/api$/, '')
  const adminSiteUrl = overview?.admin_url ? `${backendBase}${overview.admin_url}` : `${backendBase}/admin/`

  async function refreshResource(resource: DashboardResourceConfig, preferredItemId?: number | null, createNew?: boolean) {
    const [refreshedItems, refreshedOverview] = await Promise.all([
      fetchDashboardCollection(resource.endpoint),
      fetchDashboardOverview(),
    ])

    const nextCollections: DashboardCollections = {
      ...collections,
      [resource.key]: refreshedItems,
    }

    setCollections(nextCollections)
    setOverview(refreshedOverview)
    applySelection(resource.key, nextCollections, preferredItemId, createNew)
  }

  async function handleOpenDjangoAdmin() {
    setIsOpeningAdmin(true)

    try {
      const bridge = await createAdminSession()
      const destination = bridge.admin_url
        ? `${backendBase}${bridge.admin_url}`
        : adminSiteUrl

      window.location.assign(destination)
    } catch (caughtError) {
      const message =
        axios.isAxiosError(caughtError) && caughtError.response?.data
          ? formatDashboardError(caughtError.response.data)
          : 'The backend admin session could not be created.'

      pushToast('error', 'Could not open Django admin', message)
    } finally {
      setIsOpeningAdmin(false)
    }
  }

  function handleResourceChange(resourceKey: string) {
    applySelection(resourceKey, collections)
  }

  function handleSelectItem(item: DashboardItem) {
    setSelectedItem(item)
    setFormValues(createDashboardFormValues(activeResource, item))
    setFormError(null)
  }

  function handleCreateNew() {
    applySelection(activeResource.key, collections, null, true)
    pushToast(
      'info',
      `New ${activeResource.singular} draft`,
      'Fill the form and save when you are ready.',
    )
  }

  function handleFieldChange(fieldName: string, value: unknown) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setFormError(null)

    try {
      const isEditing = Boolean(selectedItem?.id)
      const payload = buildDashboardPayload(activeResource, formValues)
      const requestBody = buildDashboardRequestBody(payload)

      let savedItem: DashboardItem
      if (isEditing && selectedItem?.id) {
        savedItem = await updateDashboardItem(activeResource.endpoint, Number(selectedItem.id), requestBody)
      } else {
        savedItem = await createDashboardItem(activeResource.endpoint, requestBody)
      }

      await refreshResource(activeResource, Number(savedItem.id))
      pushToast(
        'success',
        `${activeResource.singular} ${isEditing ? 'saved' : 'created'}`,
        `${dashboardItemTitle(savedItem, activeResource)} is now updated in the portfolio data.`,
      )
    } catch (caughtError) {
      let nextError = 'Save failed. Check the field values and try again.'

      if (caughtError instanceof SyntaxError) {
        nextError = 'One of the JSON fields is invalid. Fix the format and try again.'
      } else if (axios.isAxiosError(caughtError) && caughtError.response?.data) {
        nextError = formatDashboardError(caughtError.response.data)
      }

      setFormError(nextError)
      pushToast('error', `Could not save ${activeResource.singular.toLowerCase()}`, nextError)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!selectedItem?.id) {
      return
    }

    const deletedTitle = dashboardItemTitle(selectedItem, activeResource)
    const confirmed = window.confirm(`Delete this ${activeResource.singular.toLowerCase()}?`)
    if (!confirmed) {
      return
    }

    setIsSaving(true)
    setFormError(null)

    try {
      await deleteDashboardItem(activeResource.endpoint, Number(selectedItem.id))
      await refreshResource(activeResource)
      pushToast(
        'success',
        `${activeResource.singular} deleted`,
        `${deletedTitle} was removed successfully.`,
      )
    } catch (caughtError) {
      let nextError = 'Delete failed. Try again.'

      if (axios.isAxiosError(caughtError) && caughtError.response?.data) {
        nextError = formatDashboardError(caughtError.response.data)
      }

      setFormError(nextError)
      pushToast('error', `Could not delete ${activeResource.singular.toLowerCase()}`, nextError)
    } finally {
      setIsSaving(false)
    }
  }

  if (!user || !overview) {
    return <Loader label={error || 'Loading dashboard...'} />
  }

  const busyLabel = isOpeningAdmin
    ? 'Opening the Django backend...'
    : isSaving
    ? 'Saving your changes...'
    : ''

  return (
    <DashboardLayout username={user.username}>
      {busyLabel ? <LoadingOverlay label={busyLabel} /> : null}
      <ToastStack notices={toasts} onDismiss={dismissToast} />
      <div className="shell grid gap-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Projects" value={overview.counts.projects || 0} />
          <StatCard label="Skills" value={overview.counts.skills || 0} />
          <StatCard label="Services" value={overview.counts.services || 0} />
          <StatCard label="Messages" value={overview.counts.messages || 0} />
          <StatCard label="Certificates" value={overview.counts.certificates || 0} />
          <StatCard label="Sections" value={overview.counts.content_sections || 0} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-card rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Dashboard Summary</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              {overview.profile?.full_name || 'Primary profile not configured'}
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              Manage the entire portfolio here in React: profile, section copy, site settings, links, skills, services, projects, media, education, experience, achievements, gallery, and messages.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  void handleOpenDjangoAdmin()
                }}
                disabled={isOpeningAdmin}
                className="rounded-[1.5rem] border border-[var(--line)] p-5"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-[var(--accent-strong)]" />
                  <p className="font-semibold">Django Admin Backup</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {isOpeningAdmin
                    ? 'Opening the Django backend now...'
                    : 'Open the Django backend directly without logging in again.'}
                </p>
              </button>

              <div className="rounded-[1.5rem] border border-[var(--line)] p-5">
                <div className="flex items-center gap-3">
                  <LayoutPanelTop size={20} className="text-[var(--accent-strong)]" />
                  <p className="font-semibold">Resource Manager</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Use the left panel below to switch between content types, select items, create new entries, and save edits.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[var(--line)] p-5">
                <div className="flex items-center gap-3">
                  <Database size={20} className="text-[var(--accent-strong)]" />
                  <p className="font-semibold">Uploads or Links</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Most media fields support direct file uploads and URL-based sources, including Google Drive links handled by the backend.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[var(--line)] p-5">
                <div className="flex items-center gap-3">
                  <MessageSquareText size={20} className="text-[var(--accent-strong)]" />
                  <p className="font-semibold">Inbox Preview</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {overview.recent_messages.length
                    ? `${overview.recent_messages.length} recent contact messages are available in the Inbox section below.`
                    : 'No contact messages yet. The public form will populate the Inbox automatically.'}
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-8">
            <div className="flex items-center gap-3">
              <MessageSquareText size={20} className="text-[var(--accent-strong)]" />
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Recent Messages</p>
            </div>
            <div className="mt-6 grid gap-4">
              {overview.recent_messages.length ? (
                overview.recent_messages.map((message) => (
                  <article key={message.id} className="rounded-[1.5rem] border border-[var(--line)] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{message.name}</p>
                        <p className="text-sm text-[var(--muted)]">{message.email}</p>
                      </div>
                      <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                        {message.service_interest || 'General'}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-medium">{message.subject}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{message.message}</p>
                  </article>
                ))
              ) : (
                <p className="text-sm leading-7 text-[var(--muted)]">No recent messages to preview.</p>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.34fr_0.66fr]">
          <aside className="grid gap-6">
            <div className="glass-card rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Content Sections</p>
              <div className="mt-5 grid gap-3">
                {DASHBOARD_RESOURCES.map((resource) => (
                  <button
                    key={resource.key}
                    type="button"
                    onClick={() => handleResourceChange(resource.key)}
                    className={`rounded-[1.25rem] px-4 py-3 text-left text-sm font-medium transition ${
                      activeResource.key === resource.key
                        ? 'bg-[var(--foreground)] text-[var(--background)]'
                        : 'border border-[var(--line)] text-[var(--muted)]'
                    }`}
                  >
                    {resource.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">{activeResource.label}</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight">{activeItems.length} items</p>
                </div>
                {activeResource.allowCreate !== false ? (
                  <button
                    type="button"
                    onClick={handleCreateNew}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-semibold"
                  >
                    New
                  </button>
                ) : null}
              </div>

              <div className="mt-5 grid max-h-[48rem] gap-3 overflow-y-auto pr-1">
                {activeItems.length ? (
                  activeItems.map((item) => (
                    <button
                      key={String(item.id)}
                      type="button"
                      onClick={() => handleSelectItem(item)}
                      className={`rounded-[1.25rem] border px-4 py-4 text-left transition ${
                        selectedItem?.id === item.id
                          ? 'border-transparent bg-[var(--accent-soft)]'
                          : 'border-[var(--line)]'
                      }`}
                    >
                      <p className="font-semibold">{dashboardItemTitle(item, activeResource)}</p>
                      {dashboardItemDescription(item, activeResource) ? (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">
                          {dashboardItemDescription(item, activeResource)}
                        </p>
                      ) : null}
                    </button>
                  ))
                ) : (
                  <div className="rounded-[1.25rem] border border-dashed border-[var(--line)] px-4 py-5 text-sm text-[var(--muted)]">
                    No items yet in this section.
                  </div>
                )}
              </div>

              <a href="/" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]">
                Preview Portfolio
                <ArrowUpRight size={14} />
              </a>
            </div>
          </aside>

          <ResourceForm
            resource={activeResource}
            values={formValues}
            selectedItem={selectedItem}
            collections={collections}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            isSaving={isSaving}
            error={formError}
          />
        </section>
      </div>
    </DashboardLayout>
  )
}
