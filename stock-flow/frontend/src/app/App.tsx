import { RouterProvider } from 'react-router-dom'

import { InventoryProvider } from './InventoryProvider'
import { router } from './router'

export default function App() {
  return (
    <InventoryProvider>
      <RouterProvider router={router} />
    </InventoryProvider>
  )
}
