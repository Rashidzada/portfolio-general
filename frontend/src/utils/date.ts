export function formatMonthYear(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatRange(startDate: string, endDate: string | null, isCurrent: boolean) {
  const start = formatMonthYear(startDate)
  if (isCurrent) {
    return `${start} - Present`
  }
  if (!endDate) {
    return start
  }
  return `${start} - ${formatMonthYear(endDate)}`
}
