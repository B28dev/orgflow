import { Settings, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

import { NAV_ITEMS, isNavItemActive } from '../../config/navigation'
import { PRODUCT_CLIENT, PRODUCT_NAME, getPrimaryProfile } from '../../domain/productDefinition'
import { cn } from '../../utils/cn'

type BottomNavProps = {
  isOpen: boolean
  onClose: () => void
}

export function BottomNav({ isOpen, onClose }: BottomNavProps) {
  const location = useLocation()
  const primaryProfile = getPrimaryProfile()

  return (
    <div className="xl:hidden" aria-hidden={!isOpen}>
      <button
        type="button"
        aria-label="Fechar navegação"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-[rgba(15,23,42,0.24)] backdrop-blur-[2px] transition-opacity duration-300 ease-out',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[min(21rem,88vw)] flex-col border-r border-border/80 bg-surface/98 shadow-[0_20px_48px_rgba(15,23,42,0.16)] transition-transform duration-300 ease-[var(--ease-standard)]',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Navegação principal"
      >
        <div className="border-b border-border/70 px-5 pb-5 pt-5 animate-[drawer-in_280ms_var(--ease-standard)_both]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong/80">ACAME</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-text">{PRODUCT_NAME}</h2>
              <p className="mt-2 text-sm leading-6 text-text-muted">Navegação principal com foco no conteúdo e na operação móvel.</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="inline-flex size-11 items-center justify-center rounded-2xl border border-border bg-surface-muted text-text-muted shadow-soft transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/20 hover:bg-accent-soft/60 hover:text-text"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 py-5 animate-[drawer-in_320ms_var(--ease-standard)_both]">
          <p className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Navegação</p>

          <nav className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
            <ul className="grid gap-2 pb-4">
              {NAV_ITEMS.map((item, index) => {
                const Icon = item.icon
                const isActive = isNavItemActive(location.pathname, item)

                return (
                  <li key={item.id} className="animate-[fade-in_360ms_var(--ease-standard)_both]" style={{ animationDelay: `${index * 55}ms` }}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={onClose}
                      className={cn(
                        'group flex min-h-15 items-center gap-3 rounded-2xl border px-4 py-3 transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-out',
                        isActive
                          ? 'border-accent/18 bg-accent-soft/90 text-accent-strong shadow-soft'
                          : 'border-transparent text-text-muted hover:border-border hover:bg-surface-muted hover:text-text',
                      )}
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-current/10 bg-white/75 text-current transition-colors duration-200">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs leading-5 opacity-80">{item.purpose}</p>
                      </div>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border/70 px-5 py-4">
          <div className="rounded-[1.35rem] border border-border bg-surface-muted/70 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-text">Configurações</p>
                <p className="mt-1 text-xs text-text-muted">{primaryProfile?.name ?? PRODUCT_CLIENT}</p>
              </div>
              <span className="flex size-9 items-center justify-center rounded-2xl bg-white text-text-muted shadow-soft">
                <Settings className="size-4" />
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-text-soft">
              <span>{PRODUCT_CLIENT}</span>
              <span>v0.1</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
