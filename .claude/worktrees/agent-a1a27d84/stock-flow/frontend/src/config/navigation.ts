import {
  History,
  LayoutDashboard,
  Package,
  PlusSquare,
  type LucideIcon,
} from 'lucide-react'

import { NAVIGATION_BASE } from '../domain/productDefinition'
import type { NavigationId } from '../types/product'

const iconMap: Record<NavigationId, LucideIcon> = {
  estoque: Package,
  cadastrar: PlusSquare,
  historico: History,
  dashboard: LayoutDashboard,
}

const pathMap: Record<NavigationId, string> = {
  dashboard: '/',
  estoque: '/estoque',
  cadastrar: '/cadastrar',
  historico: '/historico',
}

const navigationOrder: NavigationId[] = ['dashboard', 'estoque', 'cadastrar', 'historico']

export const NAV_ITEMS = navigationOrder
  .map((id) => NAVIGATION_BASE.find((item) => item.id === id))
  .filter((item): item is (typeof NAVIGATION_BASE)[number] => Boolean(item))
  .map((item) => ({
    ...item,
    id: item.id as NavigationId,
    path: pathMap[item.id as NavigationId],
    icon: iconMap[item.id as NavigationId],
  }))
