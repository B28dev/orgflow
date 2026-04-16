import { ArrowRight } from 'lucide-react'

import { dashboardAlerts } from '../../domain/dashboard'
import { formatQuantity } from '../../utils/formatters'
import { Card } from '../primitives/Card'
import { StockStatusBadge } from '../inventory/StockStatusBadge'

export function AlertList() {
  return (
    <Card elevated className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-text">Itens com atenção</h2>
          <p className="text-sm text-text-muted">Produtos abaixo do mínimo ou já zerados.</p>
        </div>
        <span className="hidden size-10 items-center justify-center rounded-2xl bg-surface-muted text-text-muted sm:flex">
          <ArrowRight className="size-5" />
        </span>
      </div>

      <div className="grid gap-3">
        {dashboardAlerts.map((item) => (
          <div key={item.id} className="rounded-2xl border border-border bg-surface-muted/70 p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-text">{item.nome}</p>
                <p className="text-sm text-text-muted">{item.categoria}</p>
              </div>
              <StockStatusBadge label={item.stockLabel} tone={item.stockTone} />
            </div>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-text-soft">Saldo atual</p>
                <p className="mt-1 font-semibold text-text">{formatQuantity(item.quantidadeAtual, item.unidade)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-soft">Mínimo</p>
                <p className="mt-1 font-semibold text-text">{formatQuantity(item.estoqueMinimo, item.unidade)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
