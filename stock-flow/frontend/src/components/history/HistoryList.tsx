import type { HistoryEvent } from '../../types/product'
import { HistoryItem } from './HistoryItem'

type HistoryListProps = {
  events: Array<HistoryEvent & { label: string }>
}

export function HistoryList({ events }: HistoryListProps) {
  return (
    <div className="grid gap-4">
      {events.map((event, index) => (
        <div
          key={event.id}
          className="animate-[fade-in_420ms_var(--ease-standard)_both]"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <HistoryItem event={event} />
        </div>
      ))}
    </div>
  )
}
