import {
  LayoutGrid, ListChecks, CalendarRange, BarChart3,
  ChevronLeft, ChevronRight, GitPullRequestArrow, FlaskConical,
} from 'lucide-react'
import logoMark from '../../assets/logo-mark.png'
import { useTranslation } from '../../store/TranslationContext.jsx'

export default function Sidebar({ page, setPage, collapsed, setCollapsed, userContext }) {
  const { t } = useTranslation()

  const NAV_ITEMS = [
    { id: 'overview', label: t('sidebar.overview'), icon: LayoutGrid },
    { id: 'priority', label: t('sidebar.priority'), icon: ListChecks },
    { id: 'calendar', label: t('sidebar.calendar'), icon: CalendarRange },
    ...(userContext?.role === 'DRM' ? [{ id: 'conflicts', label: t('sidebar.conflicts'), icon: GitPullRequestArrow }] : []),
    { id: 'simulator', label: t('sidebar.simulator'), icon: FlaskConical },
    { id: 'reports', label: t('sidebar.reports'), icon: BarChart3 },
  ]

  return (
    <aside
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      className={`relative shrink-0 bg-navy text-slate-300 transition-[width] duration-200 h-full ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="focus-ring absolute -right-3 top-9 z-10 hidden h-6 w-6 items-center justify-center rounded-full bg-gold text-navy shadow-card hover:bg-gold-dark md:flex"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`flex items-center gap-2.5 px-5 pt-6 pb-8 border-b border-slate-800 mb-2 ${collapsed ? 'justify-center px-0' : ''}`}>
        <img src={logoMark} alt="Niyantran" className="h-9 w-9 shrink-0 object-contain" />
        {!collapsed && (
          <div className="leading-tight">
            <p className="text-lg font-bold text-white tracking-wide">Niyantran</p>
            <span className="mt-0.5 inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-slate-400">
              INDIAN RAILWAYS
            </span>
          </div>
        )}
      </div>

      <nav className={`flex flex-col gap-1 ${collapsed ? 'px-2' : 'px-3'}`}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = page === item.id
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              title={collapsed ? item.label : undefined}
              className={`focus-ring relative flex items-center gap-3 rounded-none px-4 py-3 text-sm font-semibold border-l-4 ${
                collapsed ? 'justify-center px-0 border-transparent' : ''
              } ${
                active
                  ? 'border-gold bg-slate-800 text-white'
                  : 'border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Icon size={18} className={active ? 'text-gold' : ''} />
              {!collapsed && item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
