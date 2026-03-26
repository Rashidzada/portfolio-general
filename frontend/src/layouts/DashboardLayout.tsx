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
    <div className="min-h-screen overflow-x-hidden">
      <header className="border-b border-[var(--line)] bg-[var(--background-soft)]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)] sm:text-sm sm:tracking-[0.2em]">
              Hidden Admin Dashboard
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">Portfolio Control Room</h1>
          </div>
          <div className="grid w-full gap-3 sm:flex sm:flex-wrap sm:items-center md:w-auto">
            <span className="rounded-full border border-[var(--line)] px-4 py-2 text-center text-sm text-[var(--muted)] sm:text-left">
              Signed in as {username}
            </span>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-4 py-2 text-sm"
            >
              View Portfolio
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-4 py-2 text-sm text-[var(--background)]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="py-6 sm:py-8 lg:py-10">{children}</main>
    </div>
  )
}
