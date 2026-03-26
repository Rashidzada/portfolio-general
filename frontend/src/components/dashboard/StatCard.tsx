export function StatCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="glass-card rounded-[1.35rem] p-4 sm:rounded-[1.75rem] sm:p-6">
      <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] sm:text-sm sm:tracking-[0.16em]">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight sm:mt-4 sm:text-4xl">{value}</p>
    </div>
  )
}
