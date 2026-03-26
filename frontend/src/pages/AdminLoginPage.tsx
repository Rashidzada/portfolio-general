import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'

import { applyAccessToken } from '../api/client'
import { loginAdmin } from '../api/portfolio'
import { LoadingOverlay } from '../components/ui/LoadingOverlay'
import { setTokens } from '../utils/storage'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTarget = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/dashboard'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  useEffect(() => {
    document.title = 'Admin Login | Portfolio Dashboard'
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    try {
      const tokens = await loginAdmin(username, password)
      setTokens(tokens.access, tokens.refresh)
      applyAccessToken(tokens.access)
      navigate(redirectTarget, { replace: true })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative">
      {status === 'loading' ? <LoadingOverlay label="Signing in and preparing the dashboard..." /> : null}

      <div className="shell flex min-h-screen items-center justify-center py-12">
        <div className="glass-card grid w-full max-w-5xl overflow-hidden rounded-[2.5rem] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[linear-gradient(160deg,var(--accent-soft),transparent)] p-10 lg:p-14">
            <p className="eyebrow">Hidden Route</p>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">Protected dashboard access for portfolio content management.</h1>
            <p className="mt-6 text-base leading-8 text-[var(--muted)]">
              Use your Django admin credentials here. After sign-in you get the React dashboard overview, and you can jump into the full Django admin CMS for deeper content updates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 lg:p-14">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Admin Sign In</p>
            <div className="mt-8 grid gap-5">
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                required
                className="rounded-[1.5rem] border border-[var(--line)] bg-transparent px-5 py-4 outline-none"
              />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
                required
                className="rounded-[1.5rem] border border-[var(--line)] bg-transparent px-5 py-4 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-8 w-full rounded-full bg-[var(--foreground)] px-6 py-4 text-sm font-semibold text-[var(--background)] disabled:opacity-70"
            >
              {status === 'loading' ? 'Signing in...' : 'Enter Dashboard'}
            </button>

            {status === 'error' ? (
              <p className="mt-4 text-sm text-red-500">Login failed. Use a valid Django admin or staff user.</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  )
}
