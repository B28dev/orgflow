import { PageContainer } from '../app/layout/PageContainer'
import { AlertList } from '../components/dashboard/AlertList'
import { RecentMovements } from '../components/dashboard/RecentMovements'
import { SummaryGrid } from '../components/dashboard/SummaryGrid'
import { Badge } from '../components/primitives/Badge'
import { Card } from '../components/primitives/Card'
import { dashboardAlerts, dashboardMovements, dashboardStats } from '../domain/dashboard'

export function DashboardScreen() {
  return (
    <PageContainer className="gap-5">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:items-stretch">
        <Card elevated className="grid gap-4 bg-linear-to-br from-surface to-surface-accent">
          <div>
            <Badge tone="accent">Dashboard</Badge>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">Acompanhar a situação do estoque</h1>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">
              No celular, veja o essencial. No desktop, acompanhe alertas e movimentações com mais contexto.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:hidden">
            {dashboardStats.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-2xl border border-border bg-surface/80 px-3 py-3">
                <p className="text-xs font-medium text-text-muted">{item.label}</p>
                <p className="mt-1 text-xl font-semibold text-text">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card elevated className="hidden gap-4 xl:grid">
          <div>
            <h2 className="text-lg font-semibold text-text">Visão geral</h2>
            <p className="text-sm text-text-muted">Leitura rápida para acompanhamento gerencial.</p>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-border bg-surface-muted/70 p-4">
              <p className="text-sm font-medium text-text-muted">Itens com atenção</p>
              <p className="mt-1 text-2xl font-semibold text-text">{dashboardAlerts.length}</p>
              <p className="mt-1 text-sm text-text-muted">Produtos que pedem reposição ou conferência.</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4">
              <p className="text-sm font-medium text-text-muted">Movimentações recentes</p>
              <p className="mt-1 text-2xl font-semibold text-text">{dashboardMovements.length}</p>
              <p className="mt-1 text-sm text-text-muted">Últimos registros disponíveis no histórico atual.</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="hidden xl:block">
        <SummaryGrid />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <AlertList />
        <RecentMovements />
      </div>
    </PageContainer>
  )
}
