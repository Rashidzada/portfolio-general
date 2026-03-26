export function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-[var(--line)] bg-[var(--background-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
      {label}
    </span>
  )
}
