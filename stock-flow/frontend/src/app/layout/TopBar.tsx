import { ArrowRight, BellDot, Menu } from 'lucide-react'
import { Link, useMatches } from 'react-router-dom'

import type { RouteHandle } from '../router'
import { Badge } from '../../components/primitives/Badge'
import { Card } from '../../components/primitives/Card'
import { PRODUCT_CLIENT, PRODUCT_NAME, getPrimaryProfile } from '../../domain/productDefinition'
import { cn } from '../../utils/cn'

type MatchWithHandle = {
  handle?: RouteHandle
}

type TopBarProps = {
  isMobileNavOpen: boolean
  onToggleMobileNav: () => void
}

const actionMap: Record<string, { label: string; to: string; tone: 'primary' | 'secondary' }> = {
  Dashboard: { label: 'Ir para Estoque', to: '/estoque', tone: 'primary' },
  Estoque: { label: 'Ver histórico', to: '/historico', tone: 'secondary' },
  Cadastro: { label: 'Ver estoque', to: '/estoque', tone: 'secondary' },
  Histórico: { label: 'Ver dashboard', to: '/', tone: 'secondary' },
}

export function TopBar({ isMobileNavOpen, onToggleMobileNav }: TopBarProps) {
  const matches = useMatches() as MatchWithHandle[]
  const currentHandle = [...matches].reverse().find((match) => match.handle)?.handle
  const primaryProfile = getPrimaryProfile()
  const contextualAction = currentHandle ? actionMap[currentHandle.badge] : undefined

  return (
    <>
      {/* ════════════════════════════════════════════
          MOBILE: Compact sticky header bar
          Hidden on xl+ (desktop uses the card below)
          ════════════════════════════════════════════ */}
      <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-surface/95 px-4 backdrop-blur-sm xl:hidden">
        {/* Accent top stripe */}
        <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0" />

        {/* Hamburger button */}
        <button
          type="button"
          aria-expanded={isMobileNavOpen}
          aria-label={isMobileNavOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
          onClick={onToggleMobileNav}
          className={cn(
            'inline-flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ease-out',
            isMobileNavOpen
              ? 'border-accent/25 bg-accent-soft text-accent-strong'
              : 'border-border bg-surface-muted text-text-muted hover:border-accent/20 hover:bg-accent-soft/70 hover:text-accent-strong',
          )}
        >
          <Menu className="size-4" />
        </button>

        {/* Page name */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text">
            {currentHandle?.badge ?? PRODUCT_NAME}
          </p>
        </div>

        {/* Notification bell */}
        <button
          type="button"
          aria-label="Ver alertas do estoque"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-text-muted transition-all duration-200 ease-out hover:border-accent/20 hover:bg-accent-soft/70 hover:text-accent-strong"
        >
          <BellDot className="size-4 text-accent-strong/80" />
        </button>
      </header>

      {/* ════════════════════════════════════════════
          DESKTOP: Full contextual card header
          Hidden on mobile (xl+ only)
          ════════════════════════════════════════════ */}
      <header className="sticky top-0 z-30 hidden border-b border-border/60 bg-bg-elevated/92 backdrop-blur-sm xl:block">
        <div className="px-8 py-4 2xl:px-10 2xl:py-5">
          <Card className="relative flex flex-col gap-4 overflow-hidden rounded-[1.55rem] border-border/75 bg-surface/92 px-5 py-4 shadow-soft animate-[fade-in_340ms_var(--ease-standard)_both] xl:flex-row xl:items-center xl:justify-between xl:gap-6 2xl:px-6">
            <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/45 to-accent/0" />

            {/* Left: Page info */}
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{currentHandle?.badge ?? 'Acame-Stock'}</Badge>
                <Badge>{PRODUCT_CLIENT}</Badge>
                {primaryProfile ? <Badge>{primaryProfile.name}</Badge> : null}
              </div>

              <div>
                <h1 className="text-[1.85rem] font-semibold tracking-tight text-text 2xl:text-[2rem]">
                  {currentHandle?.title ?? PRODUCT_NAME}
                </h1>
                <p className="mt-2 max-w-[68rem] text-sm leading-6 text-text-muted xl:text-[0.95rem]">
                  {currentHandle?.description ??
                    'Fluxo diário para operação no depósito e leitura gerencial no desktop.'}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex shrink-0 items-center gap-2 xl:self-center">
              <button
                type="button"
                aria-label="Ver alertas do estoque"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-text shadow-soft transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/20 hover:bg-accent-soft/60 hover:text-text"
              >
                <BellDot className="size-5 text-accent-strong" />
              </button>

              {contextualAction ? (
                <Link
                  to={contextualAction.to}
                  className={cn(
                    'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none sm:w-auto',
                    contextualAction.tone === 'primary'
                      ? 'border border-accent bg-accent text-white shadow-[0_10px_24px_rgba(80,172,84,0.16)] hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_14px_28px_rgba(80,172,84,0.20)] active:translate-y-0'
                      : 'border border-border bg-surface text-text shadow-soft hover:-translate-y-0.5 hover:border-accent/20 hover:bg-accent-soft/60 active:translate-y-0',
                  )}
                >
                  {contextualAction.label}
                  <ArrowRight className="size-4" />
                </Link>
              ) : null}
            </div>
          </Card>
        </div>
      </header>
    </>
  )
}
