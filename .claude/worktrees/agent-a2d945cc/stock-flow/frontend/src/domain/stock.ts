import type { Product } from '../types/product'
import { getInventoryStatus, getInventoryStatusLabel, isCriticalStatus, isLowOrCriticalStatus } from './stockStatus'

export function buildInventorySummary(products: Product[]) {
  return {
    total: products.length,
    lowStock: products.map(getInventoryStatus).filter(isLowOrCriticalStatus).length,
    critical: products.map(getInventoryStatus).filter(isCriticalStatus).length,
    active: products.filter((product) => product.ativo).length,
  }
}

export function buildInventoryCards(products: Product[]) {
  return products.map((product) => {
    const stockStatus = getInventoryStatus(product)

    return {
      ...product,
      stockStatus,
      stockLabel: getInventoryStatusLabel(stockStatus),
    }
  })
}
