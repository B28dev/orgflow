import { NavLink, useLocation } from 'react-router-dom'

import { NAV_ITEMS } from '../../config/navigation'
import { cn } from '../../utils/cn'

export function BottomNav() {
  const location = useLocation()

  return (
    <nav aria-label="Navegação principal" className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-surface/98 px-3 py-3 md:hidden backdrop-blur-sm">
      <ul className="mx-auto grid max-w-xl grid-cols-4 gap-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = item.id === 'dashboard' ? location.pathname === '/' || location.pathname === '/dashboard' : location.pathname === item.path

          return (
            <li key={item.id}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={cn(
                  'flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition-[transform,background-color,color,box-shadow] duration-200 ease-out',
                  isActive
                    ? 'bg-accent-soft text-accent-strong shadow-soft'
                    : 'text-text-soft hover:bg-surface-muted hover:text-text',
                )}
              >
                <Icon className={cn('size-5 transition-transform duration-200', isActive && 'scale-110')} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
