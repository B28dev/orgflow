import { Check, Minus, PencilLine, Plus, X } from 'lucide-react'
import type { KeyboardEvent } from 'react'

import type { InventoryCardProduct } from '../../types/product'
import { formatQuantity } from '../../utils/formatters'
import { Badge } from '../primitives/Badge'
import { Button } from '../primitives/Button'
import { Card } from '../primitives/Card'
import { Input } from '../primitives/Input'
import { StockStatusBadge } from './StockStatusBadge'

type ProductCardProps = {
  product: InventoryCardProduct
  onDecrease: () => void
  onIncrease: () => void
  onStartEdit: () => void
  onEditValueChange: (value: string) => void
  onConfirmEdit: () => void
  onCancelEdit: () => void
}

export function ProductCard({
  product,
  onDecrease,
  onIncrease,
  onStartEdit,
  onEditValueChange,
  onConfirmEdit,
  onCancelEdit,
}: ProductCardProps) {
  function handleQuantityKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onConfirmEdit()
    }

    if (event.key === 'Escape') {
      onCancelEdit()
    }
  }

  return (
    <Card
      elevated
      className={[
        'space-y-4 transition duration-300 ease-out hover:-translate-y-0.5',
        product.feedback ? 'border-accent/40 bg-accent-soft/30 shadow-floating' : '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-text sm:text-xl">{product.nome}</h3>
            {product.code ? <Badge>{product.code}</Badge> : null}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <span>{product.categoria}</span>
            <span aria-hidden="true">•</span>
            <span>{product.unidade}</span>
            <span aria-hidden="true">•</span>
            <span>Atualizado {product.updatedLabel}</span>
          </div>
        </div>
        <StockStatusBadge label={product.stockLabel} tone={product.stockStatus} />
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-2xl border border-border bg-surface-muted/70 p-3.5">
          <p className="text-xs font-semibold tracking-[0.08em] text-text-soft uppercase">Saldo atual</p>

          {product.isEditing ? (
            <div className="mt-2 flex items-center gap-2">
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                value={product.editingValue}
                onChange={(event) => onEditValueChange(event.target.value)}
                onKeyDown={handleQuantityKeyDown}
                className="min-h-11 rounded-xl px-3 text-lg font-semibold"
                aria-label={`Ajustar saldo de ${product.nome}`}
                autoFocus
              />
              <Button size="icon" variant="primary" aria-label={`Confirmar ajuste de ${product.nome}`} onClick={onConfirmEdit}>
                <Check className="size-4" />
              </Button>
              <Button size="icon" variant="secondary" aria-label={`Cancelar ajuste de ${product.nome}`} onClick={onCancelEdit}>
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onStartEdit}
              className="mt-1 flex items-center gap-2 text-left text-2xl font-semibold tracking-tight text-text transition-opacity hover:opacity-80"
              aria-label={`Ajustar saldo atual de ${product.nome}`}
            >
              <span>{formatQuantity(product.quantidadeAtual, product.unidade)}</span>
              <PencilLine className="size-4 text-text-soft" />
            </button>
          )}

          <p className="mt-2 text-sm text-text-muted">Toque no saldo para registrar um ajuste manual.</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-3.5">
          <p className="text-xs font-semibold tracking-[0.08em] text-text-soft uppercase">Estoque mínimo</p>
          <p className="mt-2 text-lg font-semibold text-text">{formatQuantity(product.estoqueMinimo, product.unidade)}</p>
          <p className="mt-2 text-sm text-text-muted">A partir deste ponto o item exige atenção operacional.</p>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-3">
        <Button
          size="sm"
          variant="secondary"
          className="justify-center gap-2 border-warning/25 bg-warning-soft text-warning hover:bg-warning-soft/80"
          aria-label={`Registrar saída de ${product.nome}`}
          onClick={onDecrease}
          disabled={!product.canDecrease}
        >
          <Minus className="size-4" />
          <span className="hidden sm:inline">Saída</span>
        </Button>
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.08em] text-text-soft uppercase">Movimentação rápida</p>
          <p className="text-sm text-text-muted">Entrada e saída em um toque</p>
        </div>
        <Button size="sm" variant="primary" className="justify-center gap-2" aria-label={`Registrar entrada de ${product.nome}`} onClick={onIncrease}>
          <Plus className="size-4" />
          <span className="hidden sm:inline">Entrada</span>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {product.feedback ? <Badge tone={product.feedback.tone}>{product.feedback.label}</Badge> : <Badge tone="accent">Pronto para movimentar</Badge>}
        <Badge>{product.categoria}</Badge>
        <Badge>{product.unidade}</Badge>
        <Badge>Min. {product.estoqueMinimo}</Badge>
      </div>

      {product.observacoes ? (
        <div className="rounded-2xl border border-border bg-surface px-3.5 py-3">
          <p className="text-xs font-semibold tracking-[0.08em] text-text-soft uppercase">Observação operacional</p>
          <p className="mt-1 text-sm text-text-muted">{product.observacoes}</p>
        </div>
      ) : null}
    </Card>
  )
}
