import { dashboardMovements } from '../../domain/dashboard'
import { formatDateTime } from '../../utils/formatters'
import { Card } from '../primitives/Card'
import { Badge } from '../primitives/Badge'

const movementToneMap = {
  entrada: 'success',
  saida: 'warning',
  ajuste: 'neutral',
  cadastro: 'accent',
  remocao: 'danger',
} as const

export function RecentMovements() {
  return (
    <Card elevated className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text">Movimentações recentes</h2>
        <p className="text-sm text-text-muted">Últimas alterações registradas no fluxo do estoque.</p>
      </div>

      <div className="grid gap-3">
        {dashboardMovements.map((movement) => (
          <div key={movement.id} className="rounded-2xl border border-border bg-surface p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={movementToneMap[movement.type]}>{movement.label}</Badge>
                  <span className="text-xs text-text-soft">{formatDateTime(movement.createdAt)}</span>
                </div>
                <div>
                  <p className="font-medium text-text">{movement.productName}</p>
                  <p className="text-sm text-text-muted">{movement.category}</p>
                </div>
              </div>
            </div>
            {movement.note ? <p className="mt-3 text-sm text-text-muted">{movement.note}</p> : null}
          </div>
        ))}
      </div>
    </Card>
  )
}
