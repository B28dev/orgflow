export type NavigationId = 'estoque' | 'cadastrar' | 'historico' | 'dashboard'

export type ProductCategory = string

export type ProductUnit = 'un' | 'cx' | 'pct' | 'rol' | 'kg' | 'lt'

export type Product = {
  id: string
  code?: string
  nome: string
  categoria: ProductCategory
  unidade: ProductUnit
  quantidadeAtual: number
  estoqueMinimo: number
  observacoes?: string
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export type MovementType = 'entrada' | 'saida' | 'ajuste' | 'cadastro' | 'remocao'

export type HistoryEvent = {
  id: string
  type: MovementType
  productId: string
  productName: string
  category: ProductCategory
  quantityChanged?: number
  previousQuantity?: number
  resultingQuantity?: number
  createdAt: string
  reason?: string
  note?: string
}

export type StatusTone = 'normal' | 'baixo' | 'critico'

export type InventoryStatus = 'ok' | 'atencao' | 'baixo' | 'critico'

export type InventoryMovement = {
  id: string
  productId: string
  type: Extract<MovementType, 'entrada' | 'saida' | 'ajuste'>
  quantityChanged: number
  previousQuantity: number
  resultingQuantity: number
  createdAt: string
}

export type InventoryFeedbackTone = 'accent' | 'success' | 'warning'

export type InventoryFeedback = {
  movementId: string
  productId: string
  label: string
  tone: InventoryFeedbackTone
}

export type InventoryCardProduct = Product & {
  stockStatus: InventoryStatus
  stockLabel: string
  isEditing: boolean
  editingValue: string
  updatedLabel: string
  canDecrease: boolean
  feedback?: InventoryFeedback
}

export type InventorySummary = {
  total: number
  active: number
  visible: number
  alert: number
  attention: number
  lowStock: number
  critical: number
  movementCount: number
}
