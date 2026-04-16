import {
  History,
  LayoutDashboard,
  Package,
  PlusSquare,
  type LucideIcon,
} from 'lucide-react'

import { NAVIGATION_BASE } from '../domain/productDefinition'
import type { NavigationId } from '../types/product'

type NavigationItem = {
  id: NavigationId
  label: string
  purpose: string
  path: string
  icon: LucideIcon
}

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

export const NAV_ITEMS: NavigationItem[] = navigationOrder
  .map((id) => NAVIGATION_BASE.find((item) => item.id === id))
  .filter((item): item is (typeof NAVIGATION_BASE)[number] => Boolean(item))
  .map((item) => ({
    ...item,
    id: item.id as NavigationId,
    path: pathMap[item.id as NavigationId],
    icon: iconMap[item.id as NavigationId],
  }))

export function isNavItemActive(pathname: string, item: NavigationItem) {
  return item.id === 'dashboard' ? pathname === '/' || pathname === '/dashboard' : pathname === item.path
}

export function getActiveNavItem(pathname: string) {
  return NAV_ITEMS.find((item) => isNavItemActive(pathname, item))
}

export type { NavigationItem }
