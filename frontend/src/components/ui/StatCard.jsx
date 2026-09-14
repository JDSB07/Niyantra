import { motion } from 'framer-motion'
import { Skeleton } from './Skeleton.jsx'

export default function StatCard({ label, value, unit, highlight = false, dotColor, loading = false }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={`rounded-2xl border p-5 shadow-card ${
        highlight ? 'border-gold/40 bg-gold-soft' : 'border-slate-100 bg-white'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <p className="text-sm text-slate-500">{label}</p>
        {dotColor && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dotColor }} />}
      </div>
      {loading ? (
        <Skeleton className="mt-2.5 h-8 w-16" />
      ) : (
        <motion.p
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-2 text-3xl font-semibold text-navy"
        >
          {value}
          {unit && <span className="ml-1 text-sm font-normal text-slate-400">{unit}</span>}
        </motion.p>
      )}
    </motion.div>
  )
}
