import { ArrowRight, BellDot } from 'lucide-react'
import { Link, useMatches } from 'react-router-dom'

import type { RouteHandle } from '../router'
import { Badge } from '../../components/primitives/Badge'
import { Card } from '../../components/primitives/Card'
import { PRODUCT_CLIENT, PRODUCT_NAME, getPrimaryProfile } from '../../domain/productDefinition'
import { cn } from '../../utils/cn'

type MatchWithHandle = {
  handle?: RouteHandle
}

const actionMap: Record<string, { label: string; to: string; tone: 'primary' | 'secondary' }> = {
  Dashboard: { label: 'Ir para Estoque', to: '/estoque', tone: 'primary' },
  Estoque: { label: 'Ver histórico', to: '/historico', tone: 'secondary' },
  Cadastro: { label: 'Ver estoque', to: '/estoque', tone: 'secondary' },
  Histórico: { label: 'Ver dashboard', to: '/', tone: 'secondary' },
}

export function TopBar() {
  const matches = useMatches() as MatchWithHandle[]
  const currentHandle = [...matches].reverse().find((match) => match.handle)?.handle
  const primaryProfile = getPrimaryProfile()
  const contextualAction = currentHandle ? actionMap[currentHandle.badge] : undefined

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-bg-elevated/88 backdrop-blur-sm">
      <div className="flex w-full items-start gap-4 py-3 xl:py-4 2xl:py-5">
        <Card className="relative flex flex-1 flex-col gap-4 overflow-hidden rounded-[1.55rem] border-border/85 bg-surface/94 px-4 py-4 shadow-soft animate-[fade-in_340ms_var(--ease-standard)_both] sm:px-5 xl:px-6 xl:py-4 2xl:px-6">
          <span className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-accent/0 via-accent/50 to-accent/0" />

          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{currentHandle?.badge ?? 'Acame-Stock'}</Badge>
                <Badge>{PRODUCT_CLIENT}</Badge>
                {primaryProfile ? <Badge>{primaryProfile.name}</Badge> : null}
              </div>

              <div>
                <h1 className="text-[1.85rem] font-semibold tracking-tight text-text sm:text-3xl xl:text-[1.95rem] 2xl:text-[2rem]">
                  {currentHandle?.title ?? PRODUCT_NAME}
                </h1>
                <p className="mt-2 max-w-[64rem] text-sm leading-6 text-text-muted sm:text-[0.95rem] xl:max-w-[68rem] xl:text-[0.98rem]">
                  {currentHandle?.description ?? 'Fluxo diário para operação no depósito e leitura gerencial no desktop.'}
                </p>
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center xl:justify-end xl:self-center">
              <button
                type="button"
                aria-label="Ver alertas do estoque"
                className="inline-flex size-11 self-end items-center justify-center rounded-xl border border-border bg-surface text-text shadow-soft transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/20 hover:bg-accent-soft/60 hover:text-text focus-visible:outline-none sm:self-auto"
              >
                <BellDot className="size-5 text-accent-strong" />
              </button>

              {contextualAction ? (
                <Link
                  to={contextualAction.to}
                  className={cn(
                    'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out focus-visible:outline-none sm:w-auto xl:px-5',
                    contextualAction.tone === 'primary'
                      ? 'border border-accent bg-accent text-white shadow-[0_10px_24px_rgba(80,172,84,0.14)] hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_14px_28px_rgba(80,172,84,0.18)] active:translate-y-0 active:scale-[0.99] active:bg-accent-strong'
                      : 'border border-border bg-surface text-text shadow-soft hover:-translate-y-0.5 hover:border-accent/20 hover:bg-accent-soft/60 hover:text-text active:translate-y-0 active:scale-[0.99]',
                  )}
                >
                  {contextualAction.label}
                  <ArrowRight className="size-4" />
                </Link>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    </header>
  )
}
