import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import type { Profile, ResumeFile } from '../../types/api'
import { ThemeToggle } from '../ui/ThemeToggle'

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar({
  profile,
  resume,
  theme,
  onToggleTheme,
}: {
  profile: Profile | null
  resume: ResumeFile | null
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--background-soft)]/90 backdrop-blur-xl">
      <div className="shell flex items-center justify-between py-4">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-sm font-semibold text-white">
            {profile?.full_name?.slice(0, 2).toUpperCase() || 'DP'}
          </div>
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.16em] text-[var(--muted)] uppercase">
              Software Portfolio
            </p>
            <p className="text-sm font-medium">{profile?.full_name || 'Developer Portfolio'}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {resume?.download_source ? (
            <a
              href={resume.download_source}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium"
            >
              Download CV
            </a>
          ) : null}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        <button
          type="button"
          className="glass-card inline-flex rounded-full p-3 lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen ? (
        <div className="shell border-t border-[var(--line)] py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {sectionLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-sm text-[var(--muted)]">
                {link.label}
              </a>
            ))}
            {resume?.download_source ? (
              <a href={resume.download_source} target="_blank" rel="noreferrer" className="text-sm font-medium">
                Download CV
              </a>
            ) : null}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      ) : null}
    </header>
  )
}
