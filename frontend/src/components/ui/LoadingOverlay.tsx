export function LoadingOverlay({ label }: { label: string }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[color:var(--background)]/55 px-4 backdrop-blur-sm">
      <div className="glass-card flex min-w-[18rem] max-w-md flex-col items-center gap-4 rounded-[2rem] px-8 py-10 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent-strong)]" />
        <p className="text-sm text-[var(--muted)]">{label}</p>
      </div>
    </div>
  )
}
