import { Badge } from '../primitives/Badge'
import { EmptyState } from '../feedback/EmptyState'
import { formatDateTime } from '../../utils/formatters'

type MovementTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

type RecentMovementItem = {
  id: string
  type: string
  label: string
  productName: string
  category: string
  createdAt: string
  note?: string
  tone: MovementTone
  relativeLabel: string
}

type RecentMovementsProps = {
  items: RecentMovementItem[]
  compact?: boolean
}

export function RecentMovements({ items, compact = false }: RecentMovementsProps) {
  return items.length === 0 ? (
    <EmptyState title="Sem movimentações recentes" description="Os próximos registros de entrada, saída ou ajuste aparecerão aqui." />
  ) : (
    <div className="grid gap-3 xl:gap-4">
      {items.slice(0, compact ? 4 : items.length).map((movement, index) => (
        <div
          key={movement.id}
          className="rounded-2xl border border-border bg-surface p-3.5 animate-[fade-in_420ms_var(--ease-standard)_both] xl:p-4 2xl:p-5"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <div className="flex items-start justify-between gap-3 xl:gap-4">
            <div className="space-y-2 xl:space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={movement.tone}>{movement.label}</Badge>
                <span className="text-xs text-text-soft">{movement.relativeLabel}</span>
              </div>
              <div>
                <p className="font-medium text-text">{movement.productName}</p>
                <p className="text-sm leading-6 text-text-muted">{movement.category}</p>
              </div>
            </div>

            <span className="text-xs text-text-soft">{formatDateTime(movement.createdAt)}</span>
          </div>
          {movement.note ? <p className="mt-4 text-sm leading-6 text-text-muted xl:mt-5">{movement.note}</p> : null}
        </div>
      ))}
    </div>
  )
}
