import { Settings, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

import { NAV_ITEMS, isNavItemActive } from '../../config/navigation'
import { PRODUCT_CLIENT, PRODUCT_NAME, getPrimaryProfile } from '../../domain/productDefinition'
import { cn } from '../../utils/cn'

type MobileDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const location = useLocation()
  const primaryProfile = getPrimaryProfile()

  return (
    <div aria-hidden={!isOpen} className="xl:hidden">
      {/* Backdrop overlay */}
      <button
        type="button"
        aria-label="Fechar navegação"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/30 backdrop-blur-[3px] transition-opacity duration-300 ease-out',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Drawer panel */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[min(20rem,88vw)] flex-col bg-surface shadow-[4px_0_32px_rgba(15,23,42,0.14)] transition-transform duration-300 ease-[var(--ease-standard)]',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Menu de navegação"
      >
        {/* Right structural border */}
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-border/0 via-border-strong/50 to-border/0" />

        {/* Top accent stripe */}
        <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/0 via-accent/65 to-accent/0" />

        {/* ── ZONE 1: Brand header ── */}
        <div
          className={cn(
            'shrink-0 border-b border-border/60 px-5 pb-5 pt-6 transition-all duration-300',
            isOpen ? 'animate-[drawer-in_260ms_var(--ease-standard)_both]' : '',
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-accent-strong/75">
                ACAME
              </p>
              <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-text">
                {PRODUCT_NAME}
              </h2>
              <p className="mt-1.5 text-xs leading-5 text-text-soft">
                Controle de estoque
              </p>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-text-muted transition-all duration-200 ease-out hover:border-accent/20 hover:bg-accent-soft/70 hover:text-accent-strong"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Accent underline */}
          <div className="mt-4 h-[2px] w-7 rounded-full bg-accent/55" />
        </div>

        {/* ── ZONE 2: Navigation ── */}
        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col px-4 py-4 transition-all duration-300',
            isOpen ? 'animate-[drawer-in_320ms_var(--ease-standard)_60ms_both]' : '',
          )}
        >
          <p className="px-2 pb-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-text-soft">
            Navegação
          </p>

          <nav aria-label="Navegação mobile" className="min-h-0 flex-1 overflow-y-auto">
            <ul className="grid gap-1.5 pb-4">
              {NAV_ITEMS.map((item, index) => {
                const Icon = item.icon
                const isActive = isNavItemActive(location.pathname, item)

                return (
                  <li
                    key={item.id}
                    className={cn(isOpen ? 'animate-[fade-in_360ms_var(--ease-standard)_both]' : '')}
                    style={{ animationDelay: isOpen ? `${120 + index * 55}ms` : '0ms' }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      onClick={onClose}
                      className={cn(
                        'group relative flex min-h-[3.5rem] items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-200 ease-out',
                        isActive
                          ? 'bg-accent-soft/85 text-accent-strong'
                          : 'text-text-muted hover:bg-surface-muted hover:text-text',
                      )}
                    >
                      {/* Active bar */}
                      {isActive && (
                        <span className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-accent" />
                      )}

                      {/* Icon */}
                      <span
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200',
                          isActive
                            ? 'bg-accent/12 text-accent-strong'
                            : 'bg-surface-muted/80 text-text-soft group-hover:bg-surface group-hover:text-text',
                        )}
                      >
                        <Icon className="size-[1.05rem]" />
                      </span>

                      {/* Label */}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-none">{item.label}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-4 opacity-70">
                          {item.purpose}
                        </p>
                      </div>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* ── ZONE 3: Footer ── */}
        <div
          className={cn(
            'shrink-0 border-t border-border/60 px-4 py-4',
            isOpen ? 'animate-[drawer-in_380ms_var(--ease-standard)_80ms_both]' : '',
          )}
        >
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-muted/60 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-text-soft shadow-soft">
              <Settings className="size-3.5" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-text">Configurações</p>
              <p className="mt-0.5 truncate text-[0.68rem] text-text-soft">
                {primaryProfile?.name ?? PRODUCT_CLIENT}
              </p>
            </div>

            <span className="text-[0.65rem] font-semibold text-text-soft/60">v0.1</span>
          </div>

          <p className="mt-3 text-center text-[0.62rem] tracking-wider text-text-soft/50">
            {PRODUCT_CLIENT} · Acame-Stock
          </p>
        </div>
      </aside>
    </div>
  )
}
