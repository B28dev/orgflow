export type ProductDefinition = {
  product: {
    currentName: string
    client: string
    isProvisional: boolean
    description: string
  }
  inventoryModel: {
    primaryConcept: string
    currentBalanceField: string
    currentBalanceBehavior: string
    operationalHistoryIsCore: boolean
  }
  profiles: Array<{
    id: string
    name: string
    primary: boolean
  }>
  categories: string[]
  categoryPolicy: {
    mode: string
    managedBy: string
    allowFreeTextPerProduct: boolean
    description: string
  }
  categoryEntity: {
    description: string
    fields: Array<{
      name: string
      type: string
      required: boolean
    }>
  }
  units: string[]
  productFields: Array<{
    name: string
    type: string
    required: boolean
    description?: string
  }>
  movementTypes: string[]
  movementFields: Array<{
    name: string
    type: string
    required: boolean
    description?: string
    phase?: string
  }>
  movementOperationRules: {
    incrementButton: string
    decrementButton: string
    manualEdit: string
  }
  productMovementRelationship: {
    productRole: string
    movementRole: string
    currentBalanceDerivation: string
    dashboardDependency: string
    historyDependency: string
  }
  lowStockRule: {
    expression: string
    includesZeroAsCritical: boolean
  }
  navigation: Array<{
    id: string
    label: string
    purpose: string
  }>
  actions: Array<{
    id: string
    label: string
    recordsMovementType?: string
  }>
  outOfScope: string[]
  futureReady: {
    authenticationPlanned: boolean
    ownershipTrackingPlanned: boolean
    multiLocationPlanned: boolean
  }
}
