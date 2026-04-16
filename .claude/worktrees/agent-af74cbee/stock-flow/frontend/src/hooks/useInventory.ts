import { useEffect, useMemo, useRef, useState } from 'react'

import { mockProducts } from '../data/mockProducts'
import { createInventoryMovement, getMovementFeedback } from '../domain/movements'
import { PRODUCT_CATEGORIES } from '../domain/productDefinition'
import {
  getInventoryStatus,
  getInventoryStatusLabel,
  isCriticalStatus,
  isInventoryAlert,
  isLowOrCriticalStatus,
} from '../domain/stockStatus'
import { formatRelativeLabel } from '../utils/formatters'
import type { InventoryCardProduct, InventoryFeedback, InventoryMovement, InventorySummary, Product } from '../types/product'

type EmptyStateCopy = {
  title: string
  description: string
  actionLabel?: string
}

export type InventoryState = ReturnType<typeof useInventoryState>

const ALL_CATEGORIES = 'all'
const FEEDBACK_TIMEOUT_MS = 1600

export function useInventoryState() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState('')
  const [movements, setMovements] = useState<InventoryMovement[]>([])
  const [feedbackByProductId, setFeedbackByProductId] = useState<Record<string, InventoryFeedback>>({})
  const feedbackTimersRef = useRef<Record<string, number>>({})

  useEffect(() => {
    const timers = feedbackTimersRef.current

    return () => {
      Object.values(timers).forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  const categories = useMemo(
    () => [...new Set([...PRODUCT_CATEGORIES, ...products.map((product) => product.categoria)])],
    [products],
  )

  const visibleProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return products
      .filter((product) => {
        const matchesCategory = selectedCategory === ALL_CATEGORIES || product.categoria === selectedCategory
        const matchesSearch = normalizedSearch.length === 0 || product.nome.toLowerCase().includes(normalizedSearch)

        return matchesCategory && matchesSearch
      })
      .map((product) => {
        const stockStatus = getInventoryStatus(product)

        return {
          ...product,
          stockStatus,
          stockLabel: getInventoryStatusLabel(stockStatus),
          isEditing: editingProductId === product.id,
          editingValue: editingProductId === product.id ? editingValue : '',
          updatedLabel: formatRelativeLabel(product.updatedAt),
          canDecrease: product.quantidadeAtual > 0,
          feedback: feedbackByProductId[product.id],
        } satisfies InventoryCardProduct
      })
  }, [editingProductId, editingValue, feedbackByProductId, products, searchTerm, selectedCategory])

  const summary = useMemo<InventorySummary>(() => {
    const statuses = products.map(getInventoryStatus)

    return {
      total: products.length,
      active: products.filter((product) => product.ativo).length,
      visible: visibleProducts.length,
      alert: statuses.filter(isInventoryAlert).length,
      attention: statuses.filter((status) => status === 'atencao').length,
      lowStock: statuses.filter(isLowOrCriticalStatus).length,
      critical: statuses.filter(isCriticalStatus).length,
      movementCount: movements.length,
    }
  }, [movements.length, products, visibleProducts.length])

  const hasActiveFilters = searchTerm.trim().length > 0 || selectedCategory !== ALL_CATEGORIES

  const emptyState = useMemo<EmptyStateCopy>(() => {
    if (searchTerm.trim().length > 0 && selectedCategory !== ALL_CATEGORIES) {
      return {
        title: 'Nenhum item para essa busca',
        description: `Não encontramos produtos com "${searchTerm.trim()}" em ${selectedCategory}.`,
        actionLabel: 'Limpar filtros',
      }
    }

    if (searchTerm.trim().length > 0) {
      return {
        title: 'Nenhum produto com esse nome',
        description: `A busca por "${searchTerm.trim()}" não trouxe itens disponíveis no estoque.`,
        actionLabel: 'Limpar busca',
      }
    }

    if (selectedCategory !== ALL_CATEGORIES) {
      return {
        title: 'Categoria sem itens visíveis',
        description: `${selectedCategory} não tem produtos disponíveis neste recorte.`,
        actionLabel: 'Mostrar todas',
      }
    }

    return {
      title: 'Nenhum item disponível',
      description: 'Assim que houver produtos ativos no estoque, esta área volta a exibir a prateleira operacional.',
    }
  }, [searchTerm, selectedCategory])

  function clearFilters() {
    setSearchTerm('')
    setSelectedCategory(ALL_CATEGORIES)
  }

  function openInlineEditor(productId: string) {
    const product = products.find((item) => item.id === productId)

    if (!product) {
      return
    }

    setEditingProductId(product.id)
    setEditingValue(String(product.quantidadeAtual))
  }

  function updateEditingValue(value: string) {
    if (/^\d*$/.test(value)) {
      setEditingValue(value)
    }
  }

  function closeInlineEditor() {
    setEditingProductId(null)
    setEditingValue('')
  }

  function showFeedback(productId: string, feedback: InventoryFeedback) {
    window.clearTimeout(feedbackTimersRef.current[productId])

    setFeedbackByProductId((current) => ({
      ...current,
      [productId]: feedback,
    }))

    feedbackTimersRef.current[productId] = window.setTimeout(() => {
      setFeedbackByProductId((current) => {
        if (!current[productId]) {
          return current
        }

        const next = { ...current }
        delete next[productId]
        return next
      })
    }, FEEDBACK_TIMEOUT_MS)
  }

  function applyQuantityChange(productId: string, nextQuantity: number, type: 'entrada' | 'saida' | 'ajuste') {
    const product = products.find((item) => item.id === productId)

    if (!product) {
      return
    }

    const normalizedQuantity = Math.max(0, Math.trunc(nextQuantity))

    if (normalizedQuantity === product.quantidadeAtual) {
      closeInlineEditor()
      return
    }

    const createdAt = new Date().toISOString()
    const movement = createInventoryMovement({
      productId,
      type,
      previousQuantity: product.quantidadeAtual,
      resultingQuantity: normalizedQuantity,
      createdAt,
    })

    setProducts((current) =>
      current.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantidadeAtual: normalizedQuantity,
              updatedAt: createdAt,
            }
          : item,
      ),
    )
    setMovements((current) => [movement, ...current])
    showFeedback(productId, getMovementFeedback(movement, product.unidade))
    closeInlineEditor()
  }

  function increaseQuantity(productId: string) {
    const product = products.find((item) => item.id === productId)

    if (!product) {
      return
    }

    applyQuantityChange(productId, product.quantidadeAtual + 1, 'entrada')
  }

  function decreaseQuantity(productId: string) {
    const product = products.find((item) => item.id === productId)

    if (!product || product.quantidadeAtual === 0) {
      return
    }

    applyQuantityChange(productId, product.quantidadeAtual - 1, 'saida')
  }

  function confirmInlineEdit(productId: string) {
    const product = products.find((item) => item.id === productId)

    if (!product) {
      return
    }

    const normalizedValue = editingValue.trim()

    if (normalizedValue.length === 0) {
      setEditingValue(String(product.quantidadeAtual))
      return
    }

    const parsedValue = Number.parseInt(normalizedValue, 10)

    applyQuantityChange(productId, Number.isNaN(parsedValue) ? product.quantidadeAtual : parsedValue, 'ajuste')
  }

  return {
    categories,
    emptyState,
    hasActiveFilters,
    movements,
    products: visibleProducts,
    rawProducts: products,
    searchTerm,
    selectedCategory,
    summary,
    clearFilters,
    closeInlineEditor,
    confirmInlineEdit,
    decreaseQuantity,
    increaseQuantity,
    openInlineEditor,
    setSearchTerm,
    setSelectedCategory,
    updateEditingValue,
  }
}

export function useInventory() {
  return useInventoryState()
}
