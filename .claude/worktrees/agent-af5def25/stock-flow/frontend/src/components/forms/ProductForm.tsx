import { Save } from 'lucide-react'

import { PRODUCT_CATEGORIES, PRODUCT_UNITS } from '../../domain/productDefinition'
import { Button } from '../primitives/Button'
import { Card } from '../primitives/Card'
import { Input } from '../primitives/Input'
import { Select } from '../primitives/Select'
import { FieldGroup } from './FieldGroup'

export function ProductForm() {
  return (
    <Card elevated className="grid gap-6">
      <div>
        <h2 className="text-lg font-semibold text-text">Dados do item</h2>
        <p className="mt-1 text-sm text-text-muted">Cadastre identificação, unidade e controle inicial do estoque.</p>
      </div>

      <div className="grid gap-5">
        <section className="grid gap-4">
          <div>
            <h3 className="text-sm font-semibold text-text">Identificação</h3>
            <p className="text-sm text-text-muted">Informações para localizar o item com rapidez.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup className="md:col-span-2" label="Nome do produto" required hint="Use um nome curto para facilitar a busca.">
              <Input placeholder="Ex.: Papel toalha interfolha" />
            </FieldGroup>

            <FieldGroup label="Categoria" required hint="Selecione uma opção padronizada.">
              <Select defaultValue="">
                <option value="" disabled>
                  Selecione a categoria
                </option>
                {PRODUCT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </FieldGroup>

            <FieldGroup label="Unidade" required hint="Use a unidade principal de controle.">
              <Select defaultValue="">
                <option value="" disabled>
                  Selecione a unidade
                </option>
                {PRODUCT_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </FieldGroup>
          </div>
        </section>

        <section className="grid gap-4 rounded-[1.4rem] border border-border bg-surface-muted/70 p-4">
          <div>
            <h3 className="text-sm font-semibold text-text">Controle inicial</h3>
            <p className="text-sm text-text-muted">Saldo disponível e ponto mínimo para alerta.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup label="Quantidade atual" required hint="Saldo disponível no momento do cadastro.">
              <Input type="number" min="0" placeholder="0" />
            </FieldGroup>

            <FieldGroup label="Estoque mínimo" required hint="A partir daqui o item entra em alerta.">
              <Input type="number" min="0" placeholder="0" />
            </FieldGroup>
          </div>
        </section>

        <section className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-text">Observações</h3>
            <span className="text-xs font-semibold text-text-soft">Opcional</span>
          </div>

          <FieldGroup label="Contexto do item" hint="Use só quando houver informação útil para a operação.">
            <textarea
              rows={4}
              placeholder="Ex.: Uso diário nos banheiros e recepção."
              className="min-h-28 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text shadow-soft placeholder:text-text-soft focus:border-accent focus:bg-bg-elevated focus:outline-none"
            />
          </FieldGroup>
        </section>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-muted">Campos essenciais para cadastrar e acompanhar o item.</p>
        <Button className="justify-center gap-2">
          <Save className="size-4" />
          Salvar produto
        </Button>
      </div>
    </Card>
  )
}
