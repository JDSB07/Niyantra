export const DEPT_COLOR = {
  ENG: '#F59E0B',
  SNT: '#3B82F6',
  TRD: '#8B5CF6',
  merged: '#10B981',
}

export const DEPT_BORDER = {
  ENG: '#D9A62B',
  SNT: '#2563EB',
  TRD: '#7C3AED',
}

export function blockPrimaryColor(departments) {
  if (!departments || !departments.length) return '#8B5CF6'
  if (departments.length > 1) return DEPT_COLOR.TRD
  return DEPT_COLOR[departments[0]] || '#8B5CF6'
}

export function dayFromCorridorDay(corridorDay) {
  // corridor.day looks like "2025-04-14+3" — base date plus day offset
  const [base, offsetStr] = String(corridorDay).split('+')
  const offset = Number(offsetStr || 0)
  const d = new Date(`${base}T00:00:00`)
  d.setDate(d.getDate() + offset)
  return d
}

export function formatDayLabel(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

export function formatTimeOfDay(minute) {
  const m = ((minute % 1440) + 1440) % 1440
  const h24 = Math.floor(m / 60)
  const mm = (m % 60).toString().padStart(2, '0')
  const period = h24 >= 12 ? 'PM' : 'AM'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12.toString().padStart(2, '0')}:${mm} ${period}`
}
