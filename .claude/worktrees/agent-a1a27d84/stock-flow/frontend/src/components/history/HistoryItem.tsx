import { ArrowDownLeft, ArrowUpRight, ClipboardPenLine, PackageMinus, PackagePlus } from 'lucide-react'

import type { HistoryEvent } from '../../types/product'
import { cn } from '../../utils/cn'
import { formatDateTime, formatRelativeLabel } from '../../utils/formatters'
import { Badge } from '../primitives/Badge'
import { Card } from '../primitives/Card'

type HistoryItemProps = {
  event: HistoryEvent & {
    label: string
  }
}

const iconMap = {
  cadastro: PackagePlus,
  entrada: ArrowUpRight,
  saida: ArrowDownLeft,
  ajuste: ClipboardPenLine,
  remocao: PackageMinus,
} as const

const toneMap = {
  cadastro: 'accent',
  entrada: 'success',
  saida: 'warning',
  ajuste: 'neutral',
  remocao: 'danger',
} as const

const iconToneClasses = {
  cadastro: 'bg-accent-soft text-accent',
  entrada: 'bg-success-soft text-success',
  saida: 'bg-warning-soft text-warning',
  ajuste: 'bg-surface-muted text-text-muted',
  remocao: 'bg-danger-soft text-danger',
} as const

const deltaToneClasses = {
  cadastro: 'border-accent/20 bg-accent-soft text-accent',
  entrada: 'border-success/20 bg-success-soft text-success',
  saida: 'border-warning/20 bg-warning-soft text-warning',
  ajuste: 'border-border bg-surface-muted text-text-muted',
  remocao: 'border-danger/20 bg-danger-soft text-danger',
} as const

export function HistoryItem({ event }: HistoryItemProps) {
  const Icon = iconMap[event.type]
  const hasQuantitySnapshot = typeof event.previousQuantity === 'number' && typeof event.resultingQuantity === 'number'
  const quantityChanged = typeof event.quantityChanged === 'number' && event.quantityChanged !== 0 ? event.quantityChanged : null

  return (
    <Card className="flex flex-col gap-4 md:flex-row md:items-start">
      <div className="flex items-start justify-between gap-3 md:min-w-0 md:flex-1">
        <div className="flex min-w-0 items-start gap-3">
          <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-2xl', iconToneClasses[event.type])}>
            <Icon className="size-5" />
          </span>

          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={toneMap[event.type]}>{event.label}</Badge>
              <span className="text-xs text-text-soft">{formatRelativeLabel(event.createdAt)}</span>
            </div>

            <div>
              <p className="font-semibold text-text">{event.productName}</p>
              <p className="text-sm text-text-muted">{event.category}</p>
            </div>
          </div>
        </div>

        {hasQuantitySnapshot ? (
          <div className={cn('shrink-0 rounded-2xl border px-3 py-2 text-sm font-semibold', deltaToneClasses[event.type])}>
            <div className="flex items-center gap-3">
              <span>{event.previousQuantity}</span>
              <span className="text-current/70">→</span>
              <span>{event.resultingQuantity}</span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="min-w-0 space-y-3 md:w-[42%] md:max-w-sm">
        {event.note ? <p className="text-sm text-text-muted">{event.note}</p> : null}

        <div className="flex flex-wrap items-center gap-2 text-xs text-text-soft">
          <span>{formatDateTime(event.createdAt)}</span>
          {quantityChanged ? (
            <span className={cn('rounded-full border px-2.5 py-1 font-semibold', deltaToneClasses[event.type])}>
              {quantityChanged > 0 ? `+${quantityChanged}` : quantityChanged}
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
