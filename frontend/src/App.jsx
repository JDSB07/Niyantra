import { useState, useEffect } from 'react'
import { DataProvider, useNiyantraData } from './store/DataContext.jsx'
import { TranslationProvider } from './store/TranslationContext.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Topbar from './components/layout/Topbar.jsx'
import Overview from './pages/Overview.jsx'
import PriorityQueue from './pages/PriorityQueue.jsx'
import BlockCalendar from './pages/BlockCalendar.jsx'
import ConflictResolution from './pages/ConflictResolution.jsx'
import WhatIfSimulator from './pages/WhatIfSimulator.jsx'
import ReportsAnalytics from './pages/ReportsAnalytics.jsx'
import Login from './pages/Login.jsx'
import Landing from './pages/Landing.jsx'

function Shell({ userContext, onLogout }) {
  const [page, setPage] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { bootLoading, error } = useNiyantraData()

  useEffect(() => {
    if (page === 'conflicts' && userContext.role !== 'DRM') {
      setPage('overview')
    }
  }, [page, userContext.role, setPage])

  return (
    <div className="flex h-screen bg-ir-cream dark:bg-slate-900 overflow-hidden font-sans transition-colors">
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - responsive classes added */}
      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:flex`}>
        <Sidebar 
          page={page} 
          setPage={(p) => { setPage(p); setMobileMenuOpen(false); }} 
          collapsed={collapsed} 
          setCollapsed={setCollapsed}
          userContext={userContext}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col h-screen overflow-hidden">
        <Topbar setPage={setPage} onToggleMobileMenu={() => setMobileMenuOpen(true)} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {bootLoading && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading Command Center data…</p>
            </div>
          )}
          {error && !bootLoading && (
            <p className="rounded border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              Couldn't reach the backend — {error}
            </p>
          )}
          {!bootLoading && (
            <>
              {page === 'overview' && <Overview setPage={setPage} userContext={userContext} />}
              {page === 'priority' && <PriorityQueue setPage={setPage} />}
              {page === 'calendar' && <BlockCalendar />}
              {page === 'conflicts' && userContext.role === 'DRM' && <ConflictResolution setPage={setPage} />}
              {page === 'simulator' && <WhatIfSimulator />}
              {page === 'reports' && <ReportsAnalytics />}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  // We use page state at App level to manage Landing vs Shell
  const [appState, setAppState] = useState('landing') // 'landing' | 'login' | 'shell'
  const [userContext, setUserContext] = useState({ role: 'Section Engineer', department: 'ENG', division: 'Delhi (DLI)', corridor: 'NDLS-GZB' })

  return (
    <TranslationProvider>
      <DataProvider userContext={userContext}>
        {appState === 'landing' && <Landing onLogin={() => setAppState('login')} />}
        {appState === 'login' && <Login onLogin={(ctx) => { setUserContext(ctx); setAppState('shell') }} />}
        {appState === 'shell' && <Shell userContext={userContext} onLogout={() => setAppState('landing')} />}
      </DataProvider>
    </TranslationProvider>
  )
}
