import { PageContainer } from '../app/layout/PageContainer'
import { useInventoryContext } from '../app/InventoryProvider'
import { HistoryList } from '../components/history/HistoryList'
import { Card } from '../components/primitives/Card'
import { buildHistoryFeed, buildHistorySummary } from '../domain/history'

export function HistoricoScreen() {
  const { rawProducts, movements } = useInventoryContext()
  const historyFeed = buildHistoryFeed(rawProducts, movements)
  const historySummary = buildHistorySummary(historyFeed)

  return (
    <PageContainer className="gap-5 pt-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          <h2 className="text-lg font-semibold text-text">Resumo do período</h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Consolidação rápida das movimentações recentes, incluindo as ações registradas na área de estoque durante esta sessão.
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

      <HistoryList events={historyFeed} />
    </PageContainer>
  )
}
