import { useEffect, useState } from 'react'
import { api } from './api.js'
import PrioritizationView from './components/PrioritizationView.jsx'
import WeeklySchedulerView from './components/WeeklySchedulerView.jsx'
import MonthlyForecastView from './components/MonthlyForecastView.jsx'

const TABS = [
  { id: 'priority', label: 'Prioritization' },
  { id: 'weekly', label: 'Weekly Scheduler' },
  { id: 'monthly', label: 'Monthly Forecast' },
]

export default function App() {
  const [tab, setTab] = useState('priority')
  const [tasks, setTasks] = useState([])
  const [corridors, setCorridors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.bootstrap()
      .then((data) => {
        setTasks(data.tasks)
        setCorridors(data.corridors)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-xl font-semibold text-slate-50">
          AI Block Planning <span className="text-slate-500 font-normal">— Indian Railways</span>
        </h1>
        <nav className="mt-3 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                tab === t.id
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="p-6">
        {loading && <p className="text-slate-400">Loading seed data from backend…</p>}
        {error && (
          <p className="text-red-400">
            Couldn't reach backend at http://localhost:8000 — {error}
          </p>
        )}
        {!loading && !error && (
          <>
            {tab === 'priority' && <PrioritizationView tasks={tasks} />}
            {tab === 'weekly' && <WeeklySchedulerView tasks={tasks} corridors={corridors} />}
            {tab === 'monthly' && <MonthlyForecastView tasks={tasks} corridors={corridors} />}
          </>
        )}
      </main>
    </div>
  )
}
