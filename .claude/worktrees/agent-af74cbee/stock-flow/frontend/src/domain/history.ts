import { mockHistoryEvents } from '../mocks/historyEvents'
import type { HistoryEvent, InventoryMovement, Product } from '../types/product'

const historyTypeLabels = {
  cadastro: 'Produto cadastrado',
  entrada: 'Entrada registrada',
  saida: 'Saída registrada',
  ajuste: 'Ajuste manual',
  remocao: 'Produto removido',
} as const

type HistoryFeedItem = HistoryEvent & {
  label: string
}

function isHistoryFeedItem(value: HistoryFeedItem | null): value is HistoryFeedItem {
  return value !== null
}

export function buildHistoryFeed(products: Product[], movements: InventoryMovement[]): HistoryFeedItem[] {
  const seededHistory: HistoryFeedItem[] = mockHistoryEvents.map((event) => ({
    ...event,
    label: historyTypeLabels[event.type],
  }))

  const movementHistory = movements
    .map<HistoryFeedItem | null>((movement) => {
      const product = products.find((item) => item.id === movement.productId)

      if (!product) {
        return null
      }

      const noteMap = {
        entrada: 'Movimentação registrada pela prateleira operacional.',
        saida: 'Saída registrada diretamente na tela de estoque.',
        ajuste: 'Saldo ajustado manualmente na tela de estoque.',
      } as const

      const quantityChanged = movement.type === 'saida' ? -movement.quantityChanged : movement.quantityChanged

      return {
        id: movement.id,
        type: movement.type,
        productId: movement.productId,
        productName: product.nome,
        category: product.categoria,
        quantityChanged,
        previousQuantity: movement.previousQuantity,
        resultingQuantity: movement.resultingQuantity,
        createdAt: movement.createdAt,
        note: noteMap[movement.type],
        label: historyTypeLabels[movement.type],
      }
    })
    .filter(isHistoryFeedItem)

  return [...movementHistory, ...seededHistory].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
}

export function buildHistorySummary(historyFeed: HistoryFeedItem[]) {
  return {
    entries: historyFeed.filter((event) => event.type === 'entrada').length,
    exits: historyFeed.filter((event) => event.type === 'saida').length,
    adjustments: historyFeed.filter((event) => event.type === 'ajuste').length,
  }
}

export const historyFeed: HistoryFeedItem[] = mockHistoryEvents.map((event) => ({
  ...event,
  label: historyTypeLabels[event.type],
}))
