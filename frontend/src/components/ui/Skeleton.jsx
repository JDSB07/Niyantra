export function Skeleton({ className = '' }) {
  return (
    <span
      className={`inline-block rounded-md bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 bg-[length:200%_100%] ${className}`}
      style={{ animation: 'shimmer 1.4s ease-in-out infinite' }}
    />
  )
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-100 bg-white p-5 ${className}`}>
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-3 h-7 w-16" />
    </div>
  )
}
