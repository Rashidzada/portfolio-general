export function StatCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="glass-card rounded-[1.75rem] p-6">
      <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}
