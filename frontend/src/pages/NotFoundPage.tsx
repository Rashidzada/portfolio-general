import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="shell flex min-h-screen items-center justify-center">
      <div className="glass-card max-w-xl rounded-[2rem] p-10 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">This page does not exist.</h1>
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">
          Return to the portfolio homepage or use the hidden admin login path if you meant to access the dashboard.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)]">
            Go Home
          </Link>
          <Link to="/admin/login" className="rounded-full border border-[var(--line)] px-6 py-3 text-sm font-semibold">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  )
}
