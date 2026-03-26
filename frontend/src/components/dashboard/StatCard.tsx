export function StatCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="glass-card rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)] sm:text-sm">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight sm:mt-4 sm:text-4xl">{value}</p>
    </div>
  )
}
