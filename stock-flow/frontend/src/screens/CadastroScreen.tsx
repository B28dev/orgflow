import { PageContainer } from '../app/layout/PageContainer'
import { ProductForm } from '../components/forms/ProductForm'
import { Card } from '../components/primitives/Card'
import { PRODUCT_FIELDS } from '../domain/productDefinition'

export function CadastroScreen() {
  return (
    <PageContainer className="gap-5 pt-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <ProductForm />

        <aside className="grid gap-4">
          <Card elevated className="space-y-3">
            <div>
              <h2 className="text-base font-semibold text-text">O que entra agora</h2>
              <p className="text-sm text-text-muted">Nome, categoria, unidade e controle inicial do item.</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface-muted/70 p-3">
              <p className="text-sm font-medium text-text">Poucos campos, leitura direta</p>
              <p className="mt-1 text-sm text-text-muted">A estrutura já fica pronta para evoluir depois, sem aumentar o atrito nesta etapa.</p>
            </div>
          </Card>

          <Card className="space-y-3">
            <h2 className="text-base font-semibold text-text">Campos desta etapa</h2>
            <div className="grid gap-2 text-sm text-text-muted">
              {PRODUCT_FIELDS.map((field) => (
                <div key={field.name} className="flex items-center justify-between rounded-2xl border border-border bg-surface px-3 py-2.5">
                  <span>{field.name}</span>
                  <span className="text-xs font-semibold text-text-soft">{field.required ? 'Obrigatório' : 'Opcional'}</span>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </PageContainer>
  )
}
