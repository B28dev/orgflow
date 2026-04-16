import { Settings } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

import { NAV_ITEMS } from '../../config/navigation'
import { PRODUCT_CLIENT, PRODUCT_NAME, getPrimaryProfile } from '../../domain/productDefinition'
import { cn } from '../../utils/cn'

export function DesktopSidebar() {
  const location = useLocation()
  const primaryProfile = getPrimaryProfile()

  return (
    <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-[258px] shrink-0 xl:block 2xl:w-[270px]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/85 bg-surface/96 p-4 shadow-card animate-[fade-in_420ms_var(--ease-standard)_both]">
        <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent/0 via-accent/70 to-accent/0" />

        <div className="border-b border-border/70 px-2 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-strong/80">ACAME</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-text">{PRODUCT_NAME}</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">Painel administrativo claro para leitura gerencial e operação diária.</p>
        </div>

        <div className="flex-1 px-1 py-5">
          <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Navegação</p>
          <nav aria-label="Navegação lateral" className="mt-3">
            <ul className="grid gap-2">
              {NAV_ITEMS.map((item, index) => {
                const Icon = item.icon
                const isActive = item.id === 'dashboard' ? location.pathname === '/' || location.pathname === '/dashboard' : location.pathname === item.path

                return (
                  <li key={item.id} className="animate-[fade-in_420ms_var(--ease-standard)_both]" style={{ animationDelay: `${index * 70}ms` }}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={cn(
                        'group flex min-h-15 items-center gap-3 rounded-2xl border px-4 py-3 transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-out',
                        isActive
                          ? 'border-accent/20 bg-accent-soft text-accent-strong shadow-soft'
                          : 'border-transparent text-text-muted hover:-translate-y-0.5 hover:border-border hover:bg-surface-muted hover:text-text',
                      )}
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-current/10 bg-white/70 text-current transition-colors duration-200">
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

        <div className="border-t border-border/70 px-2 pt-4">
          <div className="rounded-[1.35rem] border border-border bg-surface-muted/70 p-3.5">
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
      </div>
    </aside>
  )
}
