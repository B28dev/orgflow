import { PageContainer } from '../app/layout/PageContainer'
import { historyFeed } from '../domain/history'
import { HistoryList } from '../components/history/HistoryList'
import { Badge } from '../components/primitives/Badge'
import { Card } from '../components/primitives/Card'

const historySummary = {
  entries: historyFeed.filter((event) => event.type === 'entrada').length,
  exits: historyFeed.filter((event) => event.type === 'saida').length,
  adjustments: historyFeed.filter((event) => event.type === 'ajuste').length,
}

export function HistoricoScreen() {
  return (
    <PageContainer className="gap-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          <Badge tone="accent">Histórico</Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">Acompanhar movimentações</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Consulte entradas, saídas, ajustes e remoções em uma linha do tempo fácil de conferir.
          </p>
        </div>

        <Card elevated className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-success-soft px-3 py-3">
            <p className="text-xs font-medium text-success">Entradas</p>
            <p className="mt-1 text-lg font-semibold text-text">{historySummary.entries}</p>
          </div>
          <div className="rounded-2xl bg-warning-soft px-3 py-3">
            <p className="text-xs font-medium text-warning">Saídas</p>
            <p className="mt-1 text-lg font-semibold text-text">{historySummary.exits}</p>
          </div>
          <div className="rounded-2xl bg-surface-muted px-3 py-3">
            <p className="text-xs font-medium text-text-muted">Ajustes</p>
            <p className="mt-1 text-lg font-semibold text-text">{historySummary.adjustments}</p>
          </div>
        </Card>
      </div>

      <HistoryList />
    </PageContainer>
  )
}
