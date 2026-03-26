import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { clearTokens } from '../utils/storage'

export function DashboardLayout({
  username,
  children,
}: {
  username: string
  children: ReactNode
}) {
  const navigate = useNavigate()

  function handleLogout() {
    clearTokens()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)] bg-[var(--background-soft)]/90 backdrop-blur-xl">
        <div className="shell flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Hidden Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Portfolio Control Room</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)]">
              Signed in as {username}
            </span>
            <Link to="/" className="rounded-full border border-[var(--line)] px-4 py-2 text-sm">
              View Portfolio
            </Link>
            <button type="button" onClick={handleLogout} className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm text-[var(--background)]">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="section-space">{children}</main>
    </div>
  )
}
