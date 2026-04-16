import { PageContainer } from '../app/layout/PageContainer'
import { useInventoryContext } from '../app/InventoryProvider'
import { ProductList } from '../components/inventory/ProductList'
import { SearchField } from '../components/inventory/SearchField'
import { Badge } from '../components/primitives/Badge'
import { Button } from '../components/primitives/Button'
import { Card } from '../components/primitives/Card'
import { Select } from '../components/primitives/Select'

export function EstoqueScreen() {
  const {
    categories,
    emptyState,
    hasActiveFilters,
    products,
    searchTerm,
    selectedCategory,
    summary,
    clearFilters,
    closeInlineEditor,
    confirmInlineEdit,
    decreaseQuantity,
    increaseQuantity,
    openInlineEditor,
    setSearchTerm,
    setSelectedCategory,
    updateEditingValue,
  } = useInventoryContext()

  return (
    <PageContainer className="gap-5 pt-5 xl:gap-6 xl:pt-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_320px] xl:gap-5">
        <section className="grid gap-4 xl:gap-5">
          <Card elevated className="grid gap-4 animate-[fade-in_var(--motion-slow)_var(--ease-standard)_both] xl:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Badge tone="accent">Área operacional</Badge>
                <h2 className="mt-3 text-xl font-semibold text-text sm:text-2xl">Buscar e ajustar saldo com rapidez</h2>
                <p className="mt-2 text-sm text-text-muted">
                  Encontre o item, confira o status do estoque e registre entrada, saída ou ajuste sem sair da prateleira.
                </p>
              </div>
              <Badge>{summary.total} itens ativos na base</Badge>
            </div>

            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px] xl:grid-cols-[minmax(0,1fr)_240px]">
              <SearchField value={searchTerm} onChange={setSearchTerm} />

              <Select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} aria-label="Filtrar por categoria">
                <option value="all">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-2xl border border-border bg-surface-muted/70 px-3 py-3">
                <p className="text-xs font-medium text-text-muted">Itens ativos</p>
                <p className="mt-1 text-lg font-semibold text-text">{summary.active}</p>
              </div>
              <div className="rounded-2xl border border-warning/25 bg-warning-soft px-3 py-3">
                <p className="text-xs font-medium text-warning">Em alerta</p>
                <p className="mt-1 text-lg font-semibold text-text">{summary.lowStock}</p>
              </div>
              <div className="rounded-2xl border border-danger/25 bg-danger-soft px-3 py-3">
                <p className="text-xs font-medium text-danger">Críticos</p>
                <p className="mt-1 text-lg font-semibold text-text">{summary.critical}</p>
              </div>
              <div className="rounded-2xl border border-accent/20 bg-accent-soft/60 px-3 py-3">
                <p className="text-xs font-medium text-accent">Visíveis</p>
                <p className="mt-1 text-lg font-semibold text-text">{summary.visible}</p>
              </div>
            </div>
          </Card>

          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text">Prateleira operacional</h2>
              <p className="text-sm text-text-muted">Toque no saldo para ajuste manual ou use entrada e saída rápidas no próprio card.</p>
            </div>
            {hasActiveFilters ? (
              <Button size="sm" variant="secondary" onClick={clearFilters}>
                Limpar filtros
              </Button>
            ) : (
              <p className="hidden text-xs font-medium text-text-soft sm:block">Ajuste rápido direto em cada item</p>
            )}
          </div>

          <ProductList
            products={products}
            emptyState={emptyState}
            onEmptyAction={clearFilters}
            onDecrease={decreaseQuantity}
            onIncrease={increaseQuantity}
            onStartEdit={openInlineEditor}
            onEditValueChange={updateEditingValue}
            onConfirmEdit={confirmInlineEdit}
            onCancelEdit={closeInlineEditor}
          />
        </section>

        <aside className="grid gap-4 xl:content-start xl:gap-5">
          <Card elevated className="space-y-3 xl:p-5">
            <div>
              <h2 className="text-base font-semibold text-text">Ações desta etapa</h2>
              <p className="text-sm text-text-muted">A tela já cobre o fluxo essencial da operação sem sair da área de estoque.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent">Busca imediata</Badge>
              <Badge tone="success">Entrada</Badge>
              <Badge tone="warning">Saída</Badge>
              <Badge tone="accent">Ajuste manual</Badge>
            </div>
          </Card>

          {products.length === 0 ? (
            <Card elevated className="space-y-3 xl:p-5">
              <div>
                <h2 className="text-base font-semibold text-text">Nenhum item neste recorte</h2>
                <p className="text-sm text-text-muted">Limpe a busca ou o filtro para voltar à prateleira completa do estoque.</p>
              </div>
              <Button size="sm" variant="secondary" onClick={clearFilters}>
                Limpar filtros
              </Button>
            </Card>
          ) : (
            <Card elevated className="space-y-3 xl:p-5">
              <div>
                <h2 className="text-base font-semibold text-text">Retorno imediato</h2>
                <p className="text-sm text-text-muted">Cada alteração atualiza o saldo na hora e confirma a movimentação feita no item.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="success">Entrada +1</Badge>
                <Badge tone="warning">Saída -1</Badge>
                <Badge tone="accent">Ajuste no saldo</Badge>
              </div>
            </Card>
          )}
        </aside>
      </div>
    </PageContainer>
  )
}
