import { ArrowRight } from 'lucide-react'

import { PageContainer } from '../app/layout/PageContainer'
import { EmptyState } from '../components/feedback/EmptyState'
import { ProductList } from '../components/inventory/ProductList'
import { SearchField } from '../components/inventory/SearchField'
import { Badge } from '../components/primitives/Badge'
import { Button } from '../components/primitives/Button'
import { Card } from '../components/primitives/Card'
import { inventorySummary } from '../domain/stock'

export function EstoqueScreen() {
  return (
    <PageContainer className="gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge tone="accent">Estoque</Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text sm:text-3xl">Buscar e ajustar o estoque</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Consulte produtos, veja alertas e siga com as ações rápidas da operação.
          </p>
        </div>
        <Button variant="secondary" className="hidden items-center gap-2 sm:inline-flex">
          Ver histórico
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="grid gap-4">
          <Card elevated className="grid gap-4 animate-[fade-in_var(--motion-slow)_var(--ease-standard)_both]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-text">Busca rápida</h2>
                <p className="text-sm text-text-muted">Encontre um item e siga para a próxima ação.</p>
              </div>
              <Badge>{inventorySummary.total} itens na base</Badge>
            </div>

            <SearchField />

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface-muted/70 px-3 py-3">
                <p className="text-xs font-medium text-text-muted">Itens ativos</p>
                <p className="mt-1 text-lg font-semibold text-text">{inventorySummary.active}</p>
              </div>
              <div className="rounded-2xl border border-warning/25 bg-warning-soft px-3 py-3">
                <p className="text-xs font-medium text-warning">Em alerta</p>
                <p className="mt-1 text-lg font-semibold text-text">{inventorySummary.lowStock}</p>
              </div>
              <div className="rounded-2xl border border-danger/25 bg-danger-soft px-3 py-3 sm:col-span-1 col-span-2">
                <p className="text-xs font-medium text-danger">Críticos</p>
                <p className="mt-1 text-lg font-semibold text-text">{inventorySummary.critical}</p>
              </div>
            </div>
          </Card>

          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text">Produtos cadastrados</h2>
              <p className="text-sm text-text-muted">Entrada, saída, edição e remoção já estão preparadas visualmente.</p>
            </div>
            <p className="hidden text-xs font-medium text-text-soft sm:block">Toque na ação desejada em cada item</p>
          </div>

          <ProductList />
        </section>

        <aside className="grid gap-4">
          <Card elevated className="space-y-3">
            <div>
              <h2 className="text-base font-semibold text-text">Fluxo desta etapa</h2>
              <p className="text-sm text-text-muted">A base já cobre as ações principais do dia a dia.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent">Cadastrar item</Badge>
              <Badge>Ajustar entrada</Badge>
              <Badge>Registrar saída</Badge>
              <Badge>Editar saldo</Badge>
              <Badge>Remover item</Badge>
            </div>
          </Card>

          <EmptyState
            title="Filtros entram na próxima etapa"
            description="A tela já está pronta para receber prateleira funcional, filtros e dados reais sem mudar a base visual."
          />
        </aside>
      </div>
    </PageContainer>
  )
}
