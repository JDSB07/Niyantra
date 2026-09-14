import { useEffect, useMemo, useState } from 'react'
import { useNiyantraData } from '../store/DataContext.jsx'
import DayTimeline from '../components/calendar/DayTimeline.jsx'
import MonthRollup from '../components/calendar/MonthRollup.jsx'
import { dayFromCorridorDay } from '../components/calendar/deptColors.js'

export default function BlockCalendar() {
  const { corridors, blocks, decideBlock, monthlyPlan, runSimulateMonthly, monthlyLoading } = useNiyantraData()
  const [view, setView] = useState('day')
  const [section, setSection] = useState(null)
  const [dayOffset, setDayOffset] = useState(0)

  const sections = useMemo(() => [...new Set(corridors.map((c) => c.section))], [corridors])

  useEffect(() => {
    if (!section && sections.length) setSection(sections[0])
  }, [sections, section])

  useEffect(() => {
    if (view === 'month' && !monthlyPlan) runSimulateMonthly()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view])

  const sectionCorridors = useMemo(
    () => corridors.filter((c) => c.section === section),
    [corridors, section]
  )

  // corridors for the currently selected section, ordered by their day offset
  const orderedDays = useMemo(() => {
    const uniqueDayKeys = [...new Set(sectionCorridors.map((c) => c.day))]
    return uniqueDayKeys
      .map((d) => dayFromCorridorDay(d))
      .sort((a, b) => a - b)
  }, [sectionCorridors])

  const dayDate = orderedDays.length ? orderedDays[((dayOffset % orderedDays.length) + orderedDays.length) % orderedDays.length] : new Date()

  const dayCorridorIds = useMemo(() => {
    if (!orderedDays.length) return new Set()
    const targetKey = dayDate.toDateString()
    return new Set(
      sectionCorridors.filter((c) => dayFromCorridorDay(c.day).toDateString() === targetKey).map((c) => c.corridor_id)
    )
  }, [sectionCorridors, dayDate, orderedDays])

  const dayBlocks = useMemo(
    () => blocks.filter((b) => b.section === section && dayCorridorIds.has(b.corridor_id)),
    [blocks, section, dayCorridorIds]
  )

  return (
    <div className="bg-white rounded border border-slate-200 shadow-sm min-h-full">
      <div className="border-b border-slate-200 p-5 flex flex-wrap items-start justify-between gap-3 bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-navy">Block Calendar</h2>
          <p className="mt-1 text-xs text-slate-500">Timeline &amp; possessions for {section || '—'}</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={section || ''}
            onChange={(e) => setSection(e.target.value)}
            className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy"
          >
            {sections.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex overflow-hidden rounded-lg border border-slate-100">
            <button
              onClick={() => setView('day')}
              className={`px-4 py-2 text-sm font-medium ${view === 'day' ? 'bg-gold text-navy' : 'bg-white text-slate-500'}`}
            >
              Day / Week
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 text-sm font-medium ${view === 'month' ? 'bg-gold text-navy' : 'bg-white text-slate-500'}`}
            >
              Month Rollup
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        {view === 'day' ? (
          <div>
            <DayTimeline
              dayDate={dayDate}
              onDayChange={(delta) => setDayOffset((o) => o + delta)}
              blocks={dayBlocks}
              section={section}
              onDecide={decideBlock}
            />
          </div>
        ) : (
          <div>
            {monthlyLoading && !monthlyPlan && (
              <p className="mb-3 text-sm text-slate-400">Running the 4-week forecast…</p>
            )}
            <MonthRollup monthlyPlan={monthlyPlan} monthLabel="2025-04" />
          </div>
        )}
      </div>
    </div>
  )
}
