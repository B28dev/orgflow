import type { InventoryStatus, Product } from '../types/product'

export function getInventoryStatus(product: Pick<Product, 'quantidadeAtual' | 'estoqueMinimo'>): InventoryStatus {
  if (product.quantidadeAtual === 0) {
    return 'critico'
  }

  if (product.quantidadeAtual <= product.estoqueMinimo) {
    return 'baixo'
  }

  if (product.quantidadeAtual <= product.estoqueMinimo * 2) {
    return 'atencao'
  }

  return 'ok'
}

export function getInventoryStatusLabel(status: InventoryStatus) {
  if (status === 'critico') {
    return 'Crítico'
  }

  if (status === 'baixo') {
    return 'Abaixo do mínimo'
  }

  if (status === 'atencao') {
    return 'Atenção'
  }

  return 'Estoque ok'
}

export function isInventoryAlert(status: InventoryStatus) {
  return status !== 'ok'
}

export function isLowOrCriticalStatus(status: InventoryStatus) {
  return status === 'baixo' || status === 'critico'
}

export function isCriticalStatus(status: InventoryStatus) {
  return status === 'critico'
}
