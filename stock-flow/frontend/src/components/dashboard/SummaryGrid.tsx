import { dashboardStats } from '../../domain/dashboard'
import { StatCard } from '../primitives/StatCard'

export function SummaryGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((item, index) => (
        <div
          key={item.id}
          className="animate-[fade-in_420ms_var(--ease-standard)_both]"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <StatCard label={item.label} value={item.value} helper={item.helper} />
        </div>
      ))}
    </div>
  )
}
