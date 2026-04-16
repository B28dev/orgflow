import { Minus, PencilLine, Plus, Trash2 } from 'lucide-react'

import type { Product } from '../../types/product'
import { formatQuantity } from '../../utils/formatters'
import { Button } from '../primitives/Button'
import { Card } from '../primitives/Card'
import { StockStatusBadge } from './StockStatusBadge'

type ProductCardProps = {
  product: Product & {
    stockTone: 'normal' | 'baixo' | 'critico'
    stockLabel: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card elevated className="space-y-4 transition duration-300 ease-out hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-[0.12em] text-text-soft uppercase">{product.categoria}</p>
          <h3 className="text-base font-semibold text-text sm:text-lg">{product.nome}</h3>
          <p className="text-sm text-text-muted">ID {product.id}</p>
        </div>
        <StockStatusBadge label={product.stockLabel} tone={product.stockTone} />
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-2xl border border-border bg-surface-muted/70 p-3.5">
          <p className="text-sm text-text-muted">Quantidade atual</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-text">{formatQuantity(product.quantidadeAtual, product.unidade)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-3.5">
          <p className="text-sm text-text-muted">Estoque mínimo</p>
          <p className="mt-1 text-lg font-semibold text-text">{formatQuantity(product.estoqueMinimo, product.unidade)}</p>
        </div>
      </div>

      {product.observacoes ? (
        <div className="rounded-2xl border border-border bg-surface px-3.5 py-3">
          <p className="text-xs font-semibold tracking-[0.08em] text-text-soft uppercase">Observação</p>
          <p className="mt-1 text-sm text-text-muted">{product.observacoes}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Button
          size="sm"
          variant="secondary"
          className="justify-center gap-2 border-warning/25 bg-warning-soft text-warning hover:bg-warning-soft/80"
          aria-label={`Diminuir ${product.nome}`}
        >
          <Minus className="size-4" />
          Saída
        </Button>
        <Button size="sm" variant="primary" className="justify-center gap-2" aria-label={`Aumentar ${product.nome}`}>
          <Plus className="size-4" />
          Entrada
        </Button>
        <Button size="sm" variant="secondary" className="justify-center gap-2" aria-label={`Editar ${product.nome}`}>
          <PencilLine className="size-4" />
          Editar
        </Button>
        <Button size="sm" variant="ghost" className="justify-center gap-2" aria-label={`Remover ${product.nome}`}>
          <Trash2 className="size-4" />
          Remover
        </Button>
      </div>
    </Card>
  )
}
