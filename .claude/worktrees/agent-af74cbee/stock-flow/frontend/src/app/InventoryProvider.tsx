import { createContext, useContext, type PropsWithChildren } from 'react'

import { useInventoryState, type InventoryState } from '../hooks/useInventory'

const InventoryContext = createContext<InventoryState | null>(null)

export function InventoryProvider({ children }: PropsWithChildren) {
  const inventory = useInventoryState()

  return <InventoryContext.Provider value={inventory}>{children}</InventoryContext.Provider>
}

export function useInventoryContext() {
  const value = useContext(InventoryContext)

  if (!value) {
    throw new Error('useInventoryContext must be used within InventoryProvider')
  }

  return value
}
