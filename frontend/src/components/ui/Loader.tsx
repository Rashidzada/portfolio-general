export function Loader({
  label = 'Loading portfolio...',
  fullScreen = true,
}: {
  label?: string
  fullScreen?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-center px-4 ${
        fullScreen ? 'min-h-screen' : 'min-h-[50vh]'
      }`}
    >
      <div className="glass-card flex flex-col items-center gap-4 rounded-[2rem] px-8 py-10 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent-strong)]" />
        <p className="text-sm text-[var(--muted)]">{label}</p>
      </div>
    </div>
  )
}
