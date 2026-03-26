import { Moon, SunMedium } from 'lucide-react'

export function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: 'light' | 'dark'
  onToggle: () => void
}) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--foreground)] transition-transform hover:-translate-y-0.5"
      aria-label="Toggle theme"
    >
      {isDark ? <SunMedium size={16} /> : <Moon size={16} />}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
