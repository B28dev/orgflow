import { cn } from '../../utils/cn'
import { StatCard } from '../primitives/StatCard'

type SummaryItem = {
  id: string
  label: string
  value: number
  helper: string
}

type SummaryGridProps = {
  items: SummaryItem[]
  columnsClassName?: string
  compact?: boolean
}

export function SummaryGrid({ items, columnsClassName = 'sm:grid-cols-2 xl:grid-cols-5', compact = false }: SummaryGridProps) {
  return (
    <div className={cn('grid gap-3', columnsClassName)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="animate-[fade-in_420ms_var(--ease-standard)_both]"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <StatCard label={item.label} value={item.value} helper={item.helper} compact={compact} />
        </div>
      ))}
    </div>
  )
}
