import { Badge } from '../primitives/Badge'
import type { InventoryStatus } from '../../types/product'

type StockStatusBadgeProps = {
  label: string
  tone: InventoryStatus
}

export function StockStatusBadge({ label, tone }: StockStatusBadgeProps) {
  if (tone === 'critico') {
    return <Badge tone="danger">{label}</Badge>
  }

  if (tone === 'baixo' || tone === 'atencao') {
    return <Badge tone="warning">{label}</Badge>
  }

  return <Badge tone="success">{label}</Badge>
}
