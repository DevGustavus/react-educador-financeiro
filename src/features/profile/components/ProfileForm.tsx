import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Select'
import { Card } from '../../../components/ui/Card'
import type { FinancialProfile } from '../../../types'
import type { ProfileFormData } from '../types'

interface Props {
  initialData?: FinancialProfile | null
  onSave: (data: FinancialProfile) => void
}

const toleranciaOptions = [
  { value: '1', label: '1 — Muito Baixa' },
  { value: '2', label: '2 — Baixa' },
  { value: '3', label: '3 — Média' },
  { value: '4', label: '4 — Alta' },
  { value: '5', label: '5 — Muito Alta' },
]

const conhecimentoOptions = [
  { value: '1', label: '1 — Iniciante' },
  { value: '2', label: '2 — Básico' },
  { value: '3', label: '3 — Intermediário' },
  { value: '4', label: '4 — Avançado' },
  { value: '5', label: '5 — Especialista' },
]

export function ProfileForm({ initialData, onSave }: Props) {
  const [form, setForm] = useState<ProfileFormData>({
    rendaMensal: initialData?.rendaMensal ?? 0,
    despesasMedias: initialData?.despesasMedias ?? 0,
    patrimonio: initialData?.patrimonio ?? 0,
    reservaEmergencia: initialData?.reservaEmergencia ?? 0,
    objetivos: initialData?.objetivos ?? '',
    horizonteInvestimento: initialData?.horizonteInvestimento ?? 0,
    toleranciaRisco: initialData?.toleranciaRisco ?? 3,
    conhecimentoFinanceiro: initialData?.conhecimentoFinanceiro ?? 3,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Seu Perfil Financeiro
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="rendaMensal"
            label="Renda Mensal"
            type="number"
            step="0.01"
            value={form.rendaMensal || ''}
            onChange={(e) =>
              setForm({ ...form, rendaMensal: Number(e.target.value) })
            }
            icon={<span>R$</span>}
          />
          <Input
            id="despesasMedias"
            label="Despesas Médias"
            type="number"
            step="0.01"
            value={form.despesasMedias || ''}
            onChange={(e) =>
              setForm({ ...form, despesasMedias: Number(e.target.value) })
            }
            icon={<span>R$</span>}
          />
          <Input
            id="patrimonio"
            label="Patrimônio Total"
            type="number"
            step="0.01"
            value={form.patrimonio || ''}
            onChange={(e) =>
              setForm({ ...form, patrimonio: Number(e.target.value) })
            }
            icon={<span>R$</span>}
          />
          <Input
            id="reservaEmergencia"
            label="Reserva de Emergência"
            type="number"
            step="0.01"
            value={form.reservaEmergencia || ''}
            onChange={(e) =>
              setForm({
                ...form,
                reservaEmergencia: Number(e.target.value),
              })
            }
            icon={<span>R$</span>}
          />
          <Input
            id="horizonteInvestimento"
            label="Horizonte de Investimento (anos)"
            type="number"
            value={form.horizonteInvestimento || ''}
            onChange={(e) =>
              setForm({
                ...form,
                horizonteInvestimento: Number(e.target.value),
              })
            }
          />
          <Input
            id="objetivos"
            label="Objetivo Principal"
            placeholder="Ex: Aposentadoria, casa própria..."
            value={form.objetivos}
            onChange={(e) => setForm({ ...form, objetivos: e.target.value })}
          />
          <Select
            id="toleranciaRisco"
            label="Tolerância a Risco"
            options={toleranciaOptions}
            value={String(form.toleranciaRisco)}
            onChange={(e) =>
              setForm({
                ...form,
                toleranciaRisco: Number(e.target.value) as 1 | 2 | 3 | 4 | 5,
              })
            }
          />
          <Select
            id="conhecimentoFinanceiro"
            label="Conhecimento Financeiro"
            options={conhecimentoOptions}
            value={String(form.conhecimentoFinanceiro)}
            onChange={(e) =>
              setForm({
                ...form,
                conhecimentoFinanceiro: Number(e.target.value) as
                  1 | 2 | 3 | 4 | 5,
              })
            }
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Salvar Perfil</Button>
        </div>
      </form>
    </Card>
  )
}
