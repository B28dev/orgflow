import type { InventoryMovement, Product } from '../types/product'
import { buildHistoryFeed } from './history'
import { buildInventoryCards, buildInventorySummary } from './stock'
import { formatRelativeLabel } from '../utils/formatters'

const movementLabelMap = {
  entrada: 'Entradas no período',
  saida: 'Saídas no período',
  ajuste: 'Ajustes no período',
} as const

const movementToneMap = {
  entrada: 'success',
  saida: 'warning',
  ajuste: 'accent',
  cadastro: 'accent',
  remocao: 'danger',
} as const

export function buildDashboardData(products: Product[], movements: InventoryMovement[]) {
  const inventorySummary = buildInventorySummary(products)
  const inventoryCards = buildInventoryCards(products)
  const historyFeed = buildHistoryFeed(products, movements)

  const categoryTotals = inventoryCards.reduce<Record<string, number>>((accumulator, product) => {
    accumulator[product.categoria] = (accumulator[product.categoria] ?? 0) + product.quantidadeAtual
    return accumulator
  }, {})

  const movementCounts = historyFeed.reduce(
    (accumulator, event) => {
      if (event.type === 'entrada' || event.type === 'saida' || event.type === 'ajuste') {
        accumulator[event.type] += 1
      }

      return accumulator
    },
    {
      entrada: 0,
      saida: 0,
      ajuste: 0,
    },
  )

  const dashboardSummary = [
    {
      id: 'total-produtos',
      label: 'Total de produtos',
      value: inventorySummary.total,
      helper: 'Base atual cadastrada para leitura operacional.',
    },
    {
      id: 'itens-alerta',
      label: 'Itens em alerta',
      value: inventoryCards.filter((product) => product.stockStatus !== 'ok').length,
      helper: 'Itens com atenção, baixo estoque ou situação crítica.',
    },
    {
      id: 'entradas-periodo',
      label: movementLabelMap.entrada,
      value: movementCounts.entrada,
      helper: 'Reposições registradas na sessão e no histórico inicial.',
    },
    {
      id: 'saidas-periodo',
      label: movementLabelMap.saida,
      value: movementCounts.saida,
      helper: 'Saídas operacionais registradas no fluxo atual.',
    },
    {
      id: 'ajustes-periodo',
      label: movementLabelMap.ajuste,
      value: movementCounts.ajuste,
      helper: 'Conferências e correções manuais do período.',
    },
  ]

  const dashboardAlerts = inventoryCards.filter((product) => product.stockStatus !== 'ok').slice(0, 4)

  const dashboardMovements = historyFeed.slice(0, 5).map((movement) => ({
    ...movement,
    tone: movementToneMap[movement.type],
    relativeLabel: formatRelativeLabel(movement.createdAt),
  }))

  const dashboardCategorySummary = Object.entries(categoryTotals)
    .map(([category, quantity]) => ({
      id: category,
      category,
      quantity,
      items: inventoryCards.filter((product) => product.categoria === category).length,
      alerts: inventoryCards.filter((product) => product.categoria === category && product.stockStatus !== 'ok').length,
    }))
    .sort((left, right) => right.quantity - left.quantity)
    .slice(0, 4)

  const dashboardInventoryOverview = [
    {
      id: 'ativos',
      label: 'Itens ativos',
      value: inventorySummary.active,
      helper: 'Produtos disponíveis para operação neste momento.',
    },
    {
      id: 'atencao',
      label: 'Em atenção',
      value: inventoryCards.filter((product) => product.stockStatus === 'atencao').length,
      helper: 'Itens próximos do limite mínimo, pedindo acompanhamento.',
    },
    {
      id: 'criticos',
      label: 'Críticos',
      value: inventorySummary.critical,
      helper: 'Itens zerados com prioridade máxima de reposição.',
    },
  ]

  const dashboardMostMovedProducts = historyFeed
    .filter((event) => event.type === 'entrada' || event.type === 'saida' || event.type === 'ajuste')
    .reduce<Record<string, { productName: string; category: string; movements: number }>>((accumulator, movement) => {
      const current = accumulator[movement.productId]

      if (current) {
        current.movements += 1
        return accumulator
      }

      accumulator[movement.productId] = {
        productName: movement.productName,
        category: movement.category,
        movements: 1,
      }

      return accumulator
    }, {})

  const dashboardMostMovedProductsList = Object.entries(dashboardMostMovedProducts)
    .map(([productId, product]) => ({
      id: productId,
      ...product,
    }))
    .sort((left, right) => right.movements - left.movements)
    .slice(0, 4)

  return {
    dashboardSummary,
    dashboardAlerts,
    dashboardMovements,
    dashboardCategorySummary,
    dashboardInventoryOverview,
    dashboardMostMovedProductsList,
  }
}

export const dashboardQuickLinks = [
  {
    id: 'estoque',
    title: 'Área operacional',
    description: 'Entre no Estoque para buscar itens, ajustar saldo e seguir com a rotina do depósito.',
    href: '/estoque',
    label: 'Abrir Estoque',
  },
  {
    id: 'historico',
    title: 'Trilha das movimentações',
    description: 'Use o Histórico para conferir entradas, saídas e ajustes que explicam o saldo atual.',
    href: '/historico',
    label: 'Ver Histórico',
  },
]
