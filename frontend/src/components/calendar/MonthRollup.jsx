import { useMemo } from 'react'
import { Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FileDown } from 'lucide-react'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function buildMonthGrid(monthLabel) {
  const [yearStr, monthStr] = monthLabel.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr) - 1
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // Monday-first offset
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7

  const cells = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const rows = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))
  return { rows, monthName: firstOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }
}

export default function MonthRollup({ monthlyPlan, monthLabel = '2025-04' }) {
  const weeklyData = useMemo(() => {
    if (!monthlyPlan) return []
    return monthlyPlan.weekly_plans.map((wp, i) => ({
      label: `Week ${i + 1}`,
      planned: wp.scheduled_blocks.length,
      backlog: wp.unscheduled_task_ids.length,
    }))
  }, [monthlyPlan])

  const totals = useMemo(() => {
    if (!monthlyPlan) return null
    const totalScheduled = monthlyPlan.weekly_plans.reduce((s, w) => s + w.scheduled_blocks.length, 0)
    const totalMerged = monthlyPlan.weekly_plans.reduce((s, w) => s + w.merge_count, 0)
    return {
      totalScheduled,
      mergedEfficiency: totalScheduled ? Math.round((totalMerged / totalScheduled) * 100) : 0,
    }
  }, [monthlyPlan])

  const { rows, monthName } = useMemo(() => buildMonthGrid(monthLabel), [monthLabel])

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <h3 className="font-serif text-lg font-semibold text-navy">
          Blocks Planned vs Backlog ({monthName})
        </h3>
        {weeklyData.length ? (
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={weeklyData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1EEE4" vertical={false} />
                <XAxis dataKey="label" stroke="#94A3B8" tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#94A3B8" tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #F1EEE4', borderRadius: 12 }}
                  labelStyle={{ color: '#0F172A', fontWeight: 600 }}
                />
                <Bar yAxisId="left" dataKey="planned" name="Blocks Planned" fill="#16311F" radius={[4, 4, 0, 0]} barSize={28} />
                <Bar yAxisId="right" dataKey="backlog" name="Backlog" fill="#F0C954" radius={[4, 4, 0, 0]} barSize={28} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-slate-400">
            Run the 4-week forecast to see planned vs. backlog by week.
          </p>
        )}

        <div className="mt-6 rounded-xl border border-slate-100 p-4">
          <p className="mb-3 text-sm font-medium text-slate-500">Calendar Grid</p>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400">
            {WEEKDAYS.map((d) => (
              <div key={d} className="font-medium">{d}</div>
            ))}
            {rows.flat().map((day, i) => (
              <div
                key={i}
                className={`flex h-14 flex-col items-start justify-start rounded-lg p-1.5 text-sm ${
                  day ? 'bg-cream text-navy' : ''
                }`}
              >
                {day && <span>{day}</span>}
                {day && (day % 4 === 0) && (
                  <span className="mt-auto h-1.5 w-1.5 rounded-full bg-gold-dark" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-gold-soft p-6">
        <h3 className="font-serif text-lg font-semibold text-navy">Month Summary</h3>
        <div className="mt-4">
          <p className="text-sm text-navy/70">Total Blocks Scheduled</p>
          <p className="text-3xl font-semibold text-navy">{totals?.totalScheduled ?? '—'}</p>
        </div>
        <div className="mt-4 border-t border-navy/10 pt-4">
          <p className="text-sm text-navy/70">Merged Efficiency</p>
          <p className="text-3xl font-semibold text-navy">{totals ? `${totals.mergedEfficiency}%` : '—'}</p>
        </div>
        <button
          onClick={() => window.print()}
          className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-light"
        >
          <FileDown size={15} />
          Generate Official Plan PDF
        </button>
      </div>
    </div>
  )
}
