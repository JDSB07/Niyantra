import { useMemo } from 'react'
import { useNiyantraData } from '../store/DataContext.jsx'
import { useTranslation } from '../store/TranslationContext.jsx'
import { CalendarRange, AlertTriangle, ShieldAlert, CheckCircle, Activity, TrainFront, HardHat, Building2, Map, LayoutDashboard, BarChart3, Clock, GitPullRequestArrow } from 'lucide-react'
import DonutRing from '../components/ui/DonutRing.jsx'
import trainImage from '../assets/vande_bharat_train.jpg'

function formatTimeOfDay(minute) {
  const m = ((minute % 1440) + 1440) % 1440
  const h24 = Math.floor(m / 60)
  const mm = (m % 60).toString().padStart(2, '0')
  return `${h24.toString().padStart(2, '0')}:${mm}`
}

function StatBox({ label, value, unit, highlight = false, alert = false, icon: Icon }) {
  return (
    <div className={`relative overflow-hidden border-2 p-4 shadow-sm transition-all hover:-translate-y-1 ${alert ? 'border-red-600 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-400' : highlight ? 'border-ir-maroon bg-white dark:bg-slate-800 text-ir-maroon dark:text-ir-gold' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white'}`}>
      <div className="relative z-10">
        <div className="text-[11px] uppercase font-bold tracking-wider mb-2 opacity-80">{label}</div>
        <div className="text-3xl font-black">{value} {unit && <span className="text-sm font-bold">{unit}</span>}</div>
      </div>
      {Icon && (
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Icon size={100} />
        </div>
      )}
    </div>
  )
}

function HeroBanner({ title, subtitle, icon: Icon, nominalText }) {
  return (
    <div className="relative overflow-hidden border-b-4 border-ir-gold bg-ir-maroon dark:bg-slate-900 shadow-md transition-colors">
      <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{ backgroundImage: `url(${trainImage})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-ir-maroon dark:from-slate-900 via-ir-maroon/90 dark:via-slate-900/90 to-transparent" />
      <div className="relative z-10 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4 text-white">
          {Icon && <Icon size={48} className="text-ir-gold hidden md:block" />}
          <div>
            <h2 className="text-3xl font-black uppercase tracking-wide drop-shadow-md">{title}</h2>
            <p className="mt-1 text-sm font-bold text-ir-gold drop-shadow-sm">{subtitle}</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md text-white px-4 py-2 border border-white/20 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
          {nominalText}
        </div>
      </div>
    </div>
  )
}

function ActionButton({ title, subtitle, icon: Icon, onClick, primary = false }) {
  return (
    <button onClick={onClick} className={`focus-ring group relative overflow-hidden p-6 text-left border-2 transition-all hover:shadow-md ${primary ? 'border-ir-maroon bg-ir-maroon text-white hover:bg-ir-darkmaroon' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:border-ir-maroon hover:bg-ir-cream dark:hover:bg-slate-700'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg uppercase tracking-wide">{title}</h3>
          <p className={`text-sm mt-1 font-semibold ${primary ? 'text-ir-gold' : 'text-slate-500 dark:text-slate-400'}`}>{subtitle}</p>
        </div>
        <Icon size={32} className={`transition-transform group-hover:scale-110 ${primary ? 'text-ir-gold' : 'text-ir-maroon dark:text-white'}`} />
      </div>
    </button>
  )
}

function EngineerDashboard({ userContext, tasks, blocks, setPage }) {
  const { t } = useTranslation()
  const myTasks = tasks.filter(t => t.section === userContext.corridor)
  const myBlocks = blocks.filter(b => b.section === userContext.corridor)
  const pendingCount = myBlocks.filter(b => b.status === 'pending').length
  const criticalTasks = myTasks.filter(task => task.severity === 'critical')
  const healthyPct = myTasks.length ? Math.round(((myTasks.length - criticalTasks.length) / myTasks.length) * 100) : 0

  return (
    <div className="space-y-6 font-sans">
      <HeroBanner 
        title={t('eng.portal')} 
        subtitle={`${t('dash.corridor')}: ${userContext.corridor} | ${t('dash.division')}: ${userContext.division}`} 
        icon={HardHat} 
        nominalText={t('dash.status_online')}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label={t('eng.total_open')} value={myTasks.length} icon={Activity} />
        <StatBox label={t('eng.critical_defects')} value={criticalTasks.length} alert={criticalTasks.length > 0} icon={ShieldAlert} />
        <StatBox label={t('eng.pending_blocks')} value={pendingCount} highlight icon={Clock} />
        <StatBox label={t('eng.approved_blocks')} value={myBlocks.filter(b => b.status === 'approved').length} icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm flex flex-col items-center justify-center transition-colors">
          <h3 className="font-bold text-ir-maroon dark:text-ir-gold uppercase mb-6 border-b-2 border-ir-gold dark:border-slate-700 pb-2 w-full text-center">{t('eng.health')}</h3>
          <div className="relative">
            <DonutRing percentage={healthyPct} size={200} strokeWidth={24} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-800 dark:text-white">{healthyPct}%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{t('eng.nominal')}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-colors">
          <div className="flex justify-between items-center mb-6 border-b-2 border-ir-maroon dark:border-slate-700 pb-2">
            <h3 className="font-bold text-slate-800 dark:text-white uppercase flex items-center gap-2"><CalendarRange size={20}/> {t('eng.upcoming_schedule')}</h3>
          </div>
          
          {myBlocks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border-2 border-slate-200 dark:border-slate-700">
                <thead className="bg-ir-cream dark:bg-slate-900 text-ir-maroon dark:text-ir-gold text-xs uppercase">
                  <tr>
                    <th className="border-2 border-slate-300 dark:border-slate-700 p-3 text-left">{t('eng.start_time')}</th>
                    <th className="border-2 border-slate-300 dark:border-slate-700 p-3 text-left">{t('eng.end_time')}</th>
                    <th className="border-2 border-slate-300 dark:border-slate-700 p-3 text-left">{t('eng.departments')}</th>
                    <th className="border-2 border-slate-300 dark:border-slate-700 p-3 text-left">{t('eng.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {myBlocks.sort((a,b) => a.start_minute - b.start_minute).slice(0, 5).map((b, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <td className="border-2 border-slate-300 dark:border-slate-700 p-3 font-bold text-slate-800 dark:text-white">{formatTimeOfDay(b.start_minute)}</td>
                      <td className="border-2 border-slate-300 dark:border-slate-700 p-3 text-slate-600 dark:text-slate-300">{formatTimeOfDay(b.end_minute)}</td>
                      <td className="border-2 border-slate-300 dark:border-slate-700 p-3 text-slate-600 dark:text-slate-300">{b.departments?.join(', ') || 'Various'}</td>
                      <td className="border-2 border-slate-300 dark:border-slate-700 p-3 font-bold text-xs uppercase tracking-wide">
                        <span className={`px-2 py-1 ${b.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'}`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <CalendarRange size={48} className="mb-4 opacity-20" />
              <p className="font-bold uppercase tracking-widest">{t('eng.no_blocks')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionButton title={t('eng.priority_queue')} subtitle={t('eng.manage_defects')} icon={ShieldAlert} onClick={() => setPage('priority')} />
        <ActionButton title={t('eng.block_calendar')} subtitle={t('eng.view_timeline')} icon={CalendarRange} onClick={() => setPage('calendar')} primary />
      </div>
    </div>
  )
}

function ControllerDashboard({ userContext, blocks, corridors, setPage }) {
  const { t } = useTranslation()
  const pendingBlocks = blocks.filter(b => b.status === 'pending')
  const activeBlocks = blocks.filter(b => b.status === 'approved')

  return (
    <div className="space-y-6 font-sans">
      <HeroBanner 
        title={t('ctrl.dashboard')} 
        subtitle={`${t('dash.division')}: ${userContext.division} | ${t('ctrl.subtitle')}`} 
        icon={Activity} 
        nominalText={t('dash.status_online')}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label={t('ctrl.pending_requests')} value={pendingBlocks.length} alert={pendingBlocks.length > 0} icon={AlertTriangle} />
        <StatBox label={t('ctrl.active_blocks')} value={activeBlocks.length} highlight icon={CheckCircle} />
        <StatBox label={t('ctrl.total_corridors')} value={corridors.length} icon={Map} />
        <StatBox label={t('ctrl.network_status')} value={t('ctrl.active')} icon={TrainFront} />
      </div>

      <div className="border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition-colors">
        <div className="flex justify-between items-center mb-6 border-b-2 border-slate-900 dark:border-slate-700 pb-2">
          <h3 className="font-bold text-slate-800 dark:text-white uppercase flex items-center gap-2"><GitPullRequestArrow size={20} className="text-ir-maroon dark:text-ir-gold" /> {t('ctrl.live_requests')}</h3>
        </div>
        
        {pendingBlocks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border-2 border-slate-200 dark:border-slate-700">
              <thead className="bg-slate-900 dark:bg-black text-white text-xs uppercase tracking-wide">
                <tr>
                  <th className="border-2 border-slate-700 p-3 text-left">{t('dash.corridor')}</th>
                  <th className="border-2 border-slate-700 p-3 text-left">{t('eng.start_time')}</th>
                  <th className="border-2 border-slate-700 p-3 text-left">{t('ctrl.duration')}</th>
                  <th className="border-2 border-slate-700 p-3 text-left">{t('ctrl.req_depts')}</th>
                  <th className="border-2 border-slate-700 p-3 text-center">{t('ctrl.action')}</th>
                </tr>
              </thead>
              <tbody>
                {pendingBlocks.slice(0, 8).map((b, i) => (
                  <tr key={i} className="hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <td className="border-2 border-slate-300 dark:border-slate-700 p-3 font-black text-ir-maroon dark:text-ir-gold text-base">{b.section}</td>
                    <td className="border-2 border-slate-300 dark:border-slate-700 p-3 font-bold text-slate-700 dark:text-slate-300">{formatTimeOfDay(b.start_minute)}</td>
                    <td className="border-2 border-slate-300 dark:border-slate-700 p-3 font-semibold text-slate-600 dark:text-slate-400">{b.end_minute - b.start_minute} mins</td>
                    <td className="border-2 border-slate-300 dark:border-slate-700 p-3 text-slate-600 dark:text-slate-400">{b.departments?.join(', ') || 'N/A'}</td>
                    <td className="border-2 border-slate-300 dark:border-slate-700 p-3 text-center">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">{t('eng.pending')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <CheckCircle size={48} className="mb-4 opacity-20 text-green-600" />
            <p className="font-bold uppercase tracking-widest text-green-700 dark:text-green-500">{t('ctrl.all_resolved')}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionButton title={t('ctrl.master_calendar')} subtitle={t('ctrl.view_all_timelines')} icon={CalendarRange} onClick={() => setPage('calendar')} primary />
      </div>
    </div>
  )
}

function DRMDashboard({ userContext, tasks, blocks, corridors, setPage }) {
  const { t } = useTranslation()
  const pendingBlocks = blocks.filter((b) => b.status === 'pending').length
  const criticalCount = tasks.filter((task) => task.severity === 'critical').length

  const deptData = ['ENG', 'SNT', 'TRD'].map(dept => {
    const dTasks = tasks.filter(t => t.department === dept)
    const crit = dTasks.filter(task => task.severity === 'critical').length
    const healthyPct = dTasks.length ? Math.round(((dTasks.length - crit) / dTasks.length) * 100) : 0
    return { dept, total: dTasks.length, crit, healthyPct }
  })

  return (
    <div className="space-y-6 font-sans">
      <HeroBanner 
        title={t('drm.summary')} 
        subtitle={`${t('dash.division')}: ${userContext.division} | ${t('drm.command_center')}`} 
        icon={Building2} 
        nominalText={t('dash.status_online')}
      />
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatBox label={t('drm.total_active')} value={tasks.length} highlight icon={LayoutDashboard} />
        <StatBox label={t('drm.div_pending')} value={pendingBlocks} icon={Clock} />
        <StatBox label={t('drm.approved_possessions')} value={blocks.filter(b => b.status === 'approved').length} icon={CheckCircle} />
        <StatBox label={t('drm.critical_div')} value={criticalCount} alert={criticalCount > 0} icon={ShieldAlert} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deptData.map((d, i) => (
          <div key={i} className="border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm flex flex-col items-center transition-colors">
            <h3 className="font-bold text-ir-maroon dark:text-ir-gold uppercase mb-4 w-full text-center border-b-2 border-slate-200 dark:border-slate-700 pb-2">{d.dept} {t('eng.departments')}</h3>
            <div className="relative mb-4">
              <DonutRing percentage={d.healthyPct} size={140} strokeWidth={16} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800 dark:text-white">{d.total}</span>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-2 text-center text-sm">
              <div className="bg-slate-50 dark:bg-slate-900 p-2 border-2 border-slate-200 dark:border-slate-700">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">{t('drm.total')}</div>
                <div className="font-black text-slate-700 dark:text-white">{d.total}</div>
              </div>
              <div className={`p-2 border-2 ${d.crit > 0 ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white'}`}>
                <div className="text-[10px] uppercase font-bold">{t('drm.critical')}</div>
                <div className="font-black">{d.crit}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionButton title={t('drm.reports')} subtitle={t('drm.div_kpis')} icon={BarChart3} onClick={() => setPage('reports')} primary />
        <ActionButton title={t('ctrl.master_calendar')} subtitle={t('ctrl.view_all_timelines')} icon={CalendarRange} onClick={() => setPage('calendar')} />
        <ActionButton title={t('drm.whatif')} subtitle={t('drm.forecast')} icon={Clock} onClick={() => setPage('whatif')} />
      </div>
    </div>
  )
}

export default function Overview({ setPage, userContext }) {
  const { tasks, rankedTasks, corridors, blocks } = useNiyantraData()
  const { t } = useTranslation()
  const baseTasks = rankedTasks.length ? rankedTasks : tasks

  if (!userContext) return <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xl">{t('dash.system_offline')}</div>

  if (userContext.role === 'Section Engineer') {
    return <EngineerDashboard userContext={userContext} tasks={baseTasks} blocks={blocks} setPage={setPage} />
  }
  if (userContext.role === 'Controller') {
    return <ControllerDashboard userContext={userContext} blocks={blocks} corridors={corridors} setPage={setPage} />
  }
  return <DRMDashboard userContext={userContext} tasks={baseTasks} blocks={blocks} corridors={corridors} setPage={setPage} />
}
