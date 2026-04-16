import { ArrowUpRight } from 'lucide-react'

import { cn } from '../../utils/cn'
import { Card } from './Card'

type StatCardProps = {
  label: string
  value: number
  helper: string
  compact?: boolean
}

export function StatCard({ label, value, helper, compact = false }: StatCardProps) {
  return (
    <Card
      elevated
      className={cn(
        'relative overflow-hidden animate-[fade-in_480ms_var(--ease-standard)_both] hover:-translate-y-0.5 hover:border-accent/10 hover:shadow-floating',
        compact ? 'flex min-h-[8.75rem] flex-col justify-between gap-3 p-4' : 'flex min-h-32 flex-col justify-between gap-4 sm:min-h-36',
      )}
    >
      <span className="absolute inset-x-4 top-0 h-1 rounded-b-full bg-linear-to-r from-accent/15 via-accent to-accent/15" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-text-muted">{label}</p>
          <p className={cn('mt-2 font-semibold tracking-tight text-text', compact ? 'text-[1.9rem] sm:text-[2.2rem]' : 'text-3xl sm:text-4xl')}>
            {value}
          </p>
        </div>
        <span
          className={cn(
            'flex items-center justify-center rounded-2xl border border-accent/10 bg-accent-soft text-accent-strong',
            compact ? 'size-9' : 'size-10',
          )}
        >
          <ArrowUpRight className={cn(compact ? 'size-4.5' : 'size-5')} />
        </span>
      </div>
      <p className={cn('text-text-muted', compact ? 'text-[13px] leading-5' : 'text-sm')}>{helper}</p>
    </Card>
  )
}
