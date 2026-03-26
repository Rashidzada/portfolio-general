import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'

export interface ToastNotice {
  id: number
  title: string
  message?: string
  variant: 'success' | 'error' | 'info'
}

function toastAccentClass(variant: ToastNotice['variant']) {
  if (variant === 'success') {
    return 'border-emerald-300/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
  }

  if (variant === 'error') {
    return 'border-red-300/40 bg-red-500/10 text-red-700 dark:text-red-300'
  }

  return 'border-[var(--line)] bg-[var(--background-soft)] text-[var(--foreground)]'
}

function ToastIcon({ variant }: { variant: ToastNotice['variant'] }) {
  if (variant === 'success') {
    return <CheckCircle2 size={18} />
  }

  if (variant === 'error') {
    return <AlertCircle size={18} />
  }

  return <Info size={18} />
}

export function ToastStack({
  notices,
  onDismiss,
}: {
  notices: ToastNotice[]
  onDismiss: (id: number) => void
}) {
  return (
    <div className="pointer-events-none fixed right-4 top-24 z-[80] grid w-[min(26rem,calc(100vw-2rem))] gap-3">
      <AnimatePresence initial={false}>
        {notices.map((notice) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, x: 24, y: -6 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 24, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={`pointer-events-auto glass-card rounded-[1.5rem] border px-4 py-4 shadow-2xl ${toastAccentClass(notice.variant)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <ToastIcon variant={notice.variant} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{notice.title}</p>
                {notice.message ? (
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    {notice.message}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => onDismiss(notice.id)}
                className="shrink-0 rounded-full p-1 text-[var(--muted)] transition hover:bg-black/5 hover:text-[var(--foreground)]"
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
