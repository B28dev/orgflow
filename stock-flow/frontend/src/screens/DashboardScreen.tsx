import type { ReactNode } from 'react'
import { useMemo } from 'react'

import { ArrowRight, Boxes, LayoutGrid, PackageSearch, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useInventoryContext } from '../app/InventoryProvider'
import { PageContainer } from '../app/layout/PageContainer'
import { AlertList } from '../components/dashboard/AlertList'
import { RecentMovements } from '../components/dashboard/RecentMovements'
import { SummaryGrid } from '../components/dashboard/SummaryGrid'
import { Badge } from '../components/primitives/Badge'
import { Card } from '../components/primitives/Card'
import { buildDashboardData, dashboardQuickLinks } from '../domain/dashboard'

function DashboardBalloon({
  title,
  description,
  icon,
  children,
  delay = 0,
  action,
  priority = 'default',
}: {
  title: string
  description: string
  icon?: ReactNode
  children: ReactNode
  delay?: number
  action?: ReactNode
  priority?: 'default' | 'primary'
}) {
  return (
    <Card
      elevated
      className={[
        'space-y-4 border-border/85 animate-[fade-in_420ms_var(--ease-standard)_both] hover:shadow-card xl:space-y-6 xl:p-6 2xl:p-7',
        priority === 'primary' ? 'shadow-[0_18px_40px_rgba(15,23,42,0.08)]' : '',
      ].join(' ')}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4 xl:gap-5">
        <div className="min-w-0">
          <div className="flex items-center gap-3 xl:gap-4">
            {icon ? <span className="flex size-11 items-center justify-center rounded-2xl border border-accent/15 bg-accent-soft text-accent-strong xl:size-12">{icon}</span> : null}
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-text xl:text-[1.15rem]">{title}</h2>
              <p className="text-sm leading-6 text-text-muted xl:text-[0.95rem]">{description}</p>
            </div>
          </div>
        </div>
        {action ? <div className="shrink-0 pt-1">{action}</div> : null}
      </div>
      <div className="space-y-4 xl:space-y-5">{children}</div>
    </Card>
  )
}

function QuickAccessCard({ title, description, href, label, delay = 0 }: { title: string; description: string; href: string; label: string; delay?: number }) {
  return (
    <Link
      to={href}
      className="block rounded-[1.35rem] border border-border bg-surface p-4 shadow-soft transition-[box-shadow,border-color,background-color] duration-300 ease-out hover:border-accent/15 hover:bg-accent-soft/35 hover:shadow-floating animate-[fade-in_420ms_var(--ease-standard)_both] xl:p-5 2xl:p-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4 xl:gap-5">
        <div>
          <p className="text-base font-semibold text-text">{title}</p>
          <p className="mt-2 text-sm leading-6 text-text-muted xl:text-[0.95rem]">{description}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
          <ArrowRight className="size-5" />
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-accent-strong xl:mt-5">{label}</p>
    </Link>
  )
}

export function DashboardScreen() {
  const { rawProducts, movements } = useInventoryContext()
  const {
    dashboardAlerts,
    dashboardCategorySummary,
    dashboardInventoryOverview,
    dashboardMovements,
    dashboardMostMovedProductsList,
    dashboardSummary,
  } = useMemo(() => buildDashboardData(rawProducts, movements), [movements, rawProducts])

  const maxCategoryQuantity = Math.max(...dashboardCategorySummary.map((category) => category.quantity), 1)

  return (
    <PageContainer className="gap-5 pt-5 xl:gap-6 xl:pt-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,2.22fr)_minmax(330px,0.72fr)] 2xl:grid-cols-[minmax(0,2.4fr)_minmax(350px,0.68fr)] xl:gap-5">
        <DashboardBalloon
          title="Resumo da operação"
          description="Números principais para começar a leitura do estoque sem procurar informação solta."
          icon={<LayoutGrid className="size-5" />}
          delay={0}
          action={<Badge>{dashboardAlerts.length} alertas</Badge>}
          priority="primary"
        >
          <div className="md:hidden">
            <SummaryGrid items={dashboardSummary.slice(0, 4)} columnsClassName="grid-cols-2" compact />
          </div>
          <div className="hidden md:block">
            <SummaryGrid items={dashboardSummary} columnsClassName="md:grid-cols-2 xl:grid-cols-5" compact />
          </div>
        </DashboardBalloon>

        <DashboardBalloon
          title="Atalho principal"
          description="A ação continua concentrada no Estoque. O dashboard só organiza a leitura."
          icon={<PackageSearch className="size-5" />}
          delay={80}
        >
          <div className="grid gap-3 xl:gap-4">
            {dashboardQuickLinks.map((item, index) => (
              <QuickAccessCard key={item.id} {...item} delay={120 + index * 80} />
            ))}
          </div>
        </DashboardBalloon>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.95fr)] 2xl:grid-cols-[minmax(0,1.62fr)_minmax(0,0.88fr)] xl:gap-5">
        <DashboardBalloon
          title="Itens em alerta"
          description="Produtos que precisam de reposição, conferência ou atenção imediata."
          icon={<TriangleAlert className="size-5" />}
          delay={140}
          priority="primary"
        >
          <AlertList items={dashboardAlerts} compact={false} />
        </DashboardBalloon>

        <DashboardBalloon
          title="Movimentações recentes"
          description="Últimos registros operacionais para entender o que mudou no estoque."
          icon={<ArrowRight className="size-5" />}
          delay={200}
        >
          <RecentMovements items={dashboardMovements} compact={false} />
        </DashboardBalloon>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(285px,0.76fr)_minmax(0,1.58fr)_minmax(300px,0.82fr)] 2xl:grid-cols-[minmax(300px,0.72fr)_minmax(0,1.74fr)_minmax(320px,0.8fr)] xl:gap-5">
        <DashboardBalloon
          title="Visão geral"
          description="Estado resumido do estoque para apoiar a tomada de decisão rápida."
          icon={<LayoutGrid className="size-5" />}
          delay={260}
        >
          <div className="grid gap-3 xl:gap-4">
            {dashboardInventoryOverview.map((item, index) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border bg-surface-muted/70 p-4 animate-[fade-in_420ms_var(--ease-standard)_both] xl:p-5 2xl:p-6"
                style={{ animationDelay: `${300 + index * 70}ms` }}
              >
                <p className="text-sm font-medium text-text-muted">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-text xl:text-[1.9rem]">{item.value}</p>
                <p className="mt-3 text-sm leading-6 text-text-muted xl:text-[0.95rem]">{item.helper}</p>
              </div>
            ))}
          </div>
        </DashboardBalloon>

        <DashboardBalloon
          title="Resumo por categoria"
          description="Cada categoria fica agrupada em um bloco objetivo, sem espalhar a leitura."
          icon={<Boxes className="size-5" />}
          delay={320}
          priority="primary"
        >
          <div className="grid gap-3 xl:gap-4 xl:grid-cols-2">
            {dashboardCategorySummary.map((category, index) => (
              <div
                key={category.id}
                className="rounded-2xl border border-border bg-surface p-4 animate-[fade-in_420ms_var(--ease-standard)_both] xl:p-5 2xl:p-6"
                style={{ animationDelay: `${360 + index * 70}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-text">{category.category}</p>
                    <p className="text-sm leading-6 text-text-muted xl:text-[0.95rem]">{category.items} itens cadastrados</p>
                  </div>
                  {category.alerts > 0 ? <Badge tone="warning">{category.alerts} alertas</Badge> : <Badge tone="success">Sem alertas</Badge>}
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
                    style={{ width: `${(category.quantity / maxCategoryQuantity) * 100}%` }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm xl:text-[0.95rem]">
                  <span className="text-text-muted">Volume estimado</span>
                  <span className="font-semibold text-text">{category.quantity} unidades</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardBalloon>

        <DashboardBalloon
          title="Produtos mais movimentados"
          description="Itens que mais aparecem no histórico recente, em um bloco separado e fácil de escanear."
          icon={<TriangleAlert className="size-5" />}
          delay={380}
        >
          <div className="grid gap-3 xl:gap-4">
            {dashboardMostMovedProductsList.map((product, index) => (
              <div
                key={product.id}
                className="rounded-2xl border border-border bg-surface-muted/70 p-4 animate-[fade-in_420ms_var(--ease-standard)_both] xl:p-5 2xl:p-6"
                style={{ animationDelay: `${420 + index * 70}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-text">{product.productName}</p>
                    <p className="text-sm leading-6 text-text-muted xl:text-[0.95rem]">{product.category}</p>
                  </div>
                  <Badge tone="accent">{product.movements} registros</Badge>
                </div>
              </div>
            ))}
          </div>
        </DashboardBalloon>
      </section>
    </PageContainer>
  )
}
