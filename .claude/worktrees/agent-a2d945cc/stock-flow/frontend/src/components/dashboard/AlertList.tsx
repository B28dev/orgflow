import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { formatQuantity } from '../../utils/formatters'
import { EmptyState } from '../feedback/EmptyState'
import { StockStatusBadge } from '../inventory/StockStatusBadge'

type AlertItem = {
  id: string
  nome: string
  categoria: string
  quantidadeAtual: number
  estoqueMinimo: number
  unidade: string
  stockLabel: string
  stockStatus: 'ok' | 'atencao' | 'baixo' | 'critico'
}

type AlertListProps = {
  items: AlertItem[]
  compact?: boolean
}

export function AlertList({ items, compact = false }: AlertListProps) {
  return items.length === 0 ? (
    <EmptyState title="Sem alertas no momento" description="Quando houver itens pedindo atenção, eles aparecem aqui para leitura rápida." />
  ) : (
    <div className="grid gap-3 xl:gap-4">
      <div className="flex items-center justify-end">
        <Link
          to="/estoque"
          className="hidden size-10 items-center justify-center rounded-2xl bg-surface-muted text-text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent-strong sm:flex xl:size-11"
        >
          <ArrowRight className="size-5" />
        </Link>
      </div>

      {items.slice(0, compact ? 3 : items.length).map((item, index) => (
        <div
          key={item.id}
          className="rounded-2xl border border-border bg-surface-muted/70 p-3.5 animate-[fade-in_400ms_var(--ease-standard)_both] xl:p-4 2xl:p-5"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="flex items-start justify-between gap-3 xl:gap-4">
            <div>
              <p className="font-semibold text-text">{item.nome}</p>
              <p className="text-sm leading-6 text-text-muted">{item.categoria}</p>
            </div>
            <StockStatusBadge label={item.stockLabel} tone={item.stockStatus} />
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 xl:mt-5">
            <div>
              <p className="text-xs font-medium text-text-soft">Saldo atual</p>
              <p className="mt-1.5 font-semibold text-text">{formatQuantity(item.quantidadeAtual, item.unidade)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-text-soft">Mínimo</p>
              <p className="mt-1.5 font-semibold text-text">{formatQuantity(item.estoqueMinimo, item.unidade)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
