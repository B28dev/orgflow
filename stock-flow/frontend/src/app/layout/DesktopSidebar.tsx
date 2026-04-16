import { Settings } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

import { NAV_ITEMS, isNavItemActive } from '../../config/navigation'
import { PRODUCT_CLIENT, PRODUCT_NAME, getPrimaryProfile } from '../../domain/productDefinition'
import { cn } from '../../utils/cn'

export function DesktopSidebar() {
  const location = useLocation()
  const primaryProfile = getPrimaryProfile()

  return (
    <aside
      className="fixed inset-y-0 left-0 z-20 hidden xl:flex xl:flex-col"
      style={{ width: 'var(--shell-sidebar-width)' }}
    >
      {/* Right border — structural separator */}
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-border/0 via-border-strong/60 to-border/0" />

      {/* Sidebar panel */}
      <div className="relative flex h-full flex-col bg-surface/98 backdrop-blur-sm">
        {/* Top accent stripe */}
        <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent/0 via-accent/70 to-accent/0" />

        {/* ── ZONE 1: Logo / Brand ── */}
        <div
          className="shrink-0 border-b border-border/60 px-6 pb-6 pt-7 animate-[fade-in_340ms_var(--ease-standard)_both]"
        >
          {/* Brand label */}
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent-strong/75">
            ACAME
          </p>
          {/* Product name */}
          <h2 className="mt-1.5 text-[1.35rem] font-semibold tracking-tight text-text">
            {PRODUCT_NAME}
          </h2>
          {/* Subtitle */}
          <p className="mt-2.5 text-xs leading-5 text-text-soft">
            Controle de estoque — operação e gestão
          </p>
          {/* Green accent underline */}
          <div className="mt-4 h-[2px] w-8 rounded-full bg-accent/60" />
        </div>

        {/* ── ZONE 2: Navigation ── */}
        <div className="flex min-h-0 flex-1 flex-col px-4 py-5 animate-[fade-in_400ms_var(--ease-standard)_both]">
          <p className="px-2 pb-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-text-soft">
            Navegação
          </p>

          <nav aria-label="Navegação lateral" className="min-h-0 flex-1 overflow-y-auto">
            <ul className="grid gap-1.5 pb-2">
              {NAV_ITEMS.map((item, index) => {
                const Icon = item.icon
                const isActive = isNavItemActive(location.pathname, item)

                return (
                  <li
                    key={item.id}
                    className="animate-[fade-in_420ms_var(--ease-standard)_both]"
                    style={{ animationDelay: `${80 + index * 65}ms` }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={cn(
                        'group relative flex min-h-[3.5rem] items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-200 ease-out',
                        isActive
                          ? 'bg-accent-soft/85 text-accent-strong'
                          : 'text-text-muted hover:bg-surface-muted hover:text-text',
                      )}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-accent" />
                      )}

                      {/* Icon container */}
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
          className="shrink-0 border-t border-border/60 px-4 py-4 animate-[fade-in_480ms_var(--ease-standard)_both]"
        >
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-muted/60 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            {/* Settings icon */}
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
      </div>
    </aside>
  )
}
