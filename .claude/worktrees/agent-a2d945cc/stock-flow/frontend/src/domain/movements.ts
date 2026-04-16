import type { InventoryFeedback, InventoryMovement, ProductUnit } from '../types/product'

const movementFeedbackTone = {
  entrada: 'success',
  saida: 'warning',
  ajuste: 'accent',
} as const satisfies Record<InventoryMovement['type'], InventoryFeedback['tone']>

export function createInventoryMovement({
  productId,
  type,
  previousQuantity,
  resultingQuantity,
  createdAt = new Date().toISOString(),
}: Omit<InventoryMovement, 'id' | 'quantityChanged' | 'createdAt'> & { createdAt?: string }): InventoryMovement {
  return {
    id: `${productId}-${type}-${createdAt}`,
    productId,
    type,
    quantityChanged: Math.abs(resultingQuantity - previousQuantity),
    previousQuantity,
    resultingQuantity,
    createdAt,
  }
}

export function getMovementFeedback(movement: InventoryMovement, unit: ProductUnit): InventoryFeedback {
  if (movement.type === 'entrada') {
    return {
      movementId: movement.id,
      productId: movement.productId,
      label: `Entrada +${movement.quantityChanged} ${unit}`,
      tone: movementFeedbackTone[movement.type],
    }
  }

  if (movement.type === 'saida') {
    return {
      movementId: movement.id,
      productId: movement.productId,
      label: `Saída -${movement.quantityChanged} ${unit}`,
      tone: movementFeedbackTone[movement.type],
    }
  }

  return {
    movementId: movement.id,
    productId: movement.productId,
    label: `Ajuste para ${movement.resultingQuantity} ${unit}`,
    tone: movementFeedbackTone[movement.type],
  }
}
