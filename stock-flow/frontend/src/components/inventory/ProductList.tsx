import type { InventoryCardProduct } from '../../types/product'
import { EmptyState } from '../feedback/EmptyState'
import { ProductCard } from './ProductCard'

type ProductListProps = {
  products: InventoryCardProduct[]
  emptyState: {
    title: string
    description: string
    actionLabel?: string
  }
  onEmptyAction?: () => void
  onDecrease: (productId: string) => void
  onIncrease: (productId: string) => void
  onStartEdit: (productId: string) => void
  onEditValueChange: (value: string) => void
  onConfirmEdit: (productId: string) => void
  onCancelEdit: () => void
}

export function ProductList({
  products,
  emptyState,
  onEmptyAction,
  onDecrease,
  onIncrease,
  onStartEdit,
  onEditValueChange,
  onConfirmEdit,
  onCancelEdit,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyState.title}
        description={emptyState.description}
        actionLabel={emptyState.actionLabel}
        onAction={onEmptyAction}
      />
    )
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2 xl:gap-5">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-[fade-in_420ms_var(--ease-standard)_both]"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <ProductCard
            product={product}
            onDecrease={() => onDecrease(product.id)}
            onIncrease={() => onIncrease(product.id)}
            onStartEdit={() => onStartEdit(product.id)}
            onEditValueChange={onEditValueChange}
            onConfirmEdit={() => onConfirmEdit(product.id)}
            onCancelEdit={onCancelEdit}
          />
        </div>
      ))}
    </div>
  )
}
