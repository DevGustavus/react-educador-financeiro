import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { ProfileCard } from '../../features/investments/components/ProfileCard'
import { DiscountCalculator } from '../../features/investments/components/DiscountCalculator'
import { StockDiscountList } from '../../features/investments/components/StockDiscountList'
import { useAcoesAnalisadas } from '../../features/investments/hooks/useAcoesAnalisadas'
import { perfis } from '../../features/investments/data/profiles'
import type { AcaoSalva } from '../../features/investments/types'

export function InvestmentsPage() {
  const { acoes, salvarAcao, removeAcao } = useAcoesAnalisadas()
  const [editing, setEditing] = useState<AcaoSalva | null>(null)

  const handleEdit = (acao: AcaoSalva) => {
    setEditing(acao)
    document
      .getElementById('calculadora')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSave = (acao: AcaoSalva, antigaId?: string) => {
    salvarAcao(acao, antigaId)
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir esta análise?')) {
      if (editing?.id === id) setEditing(null)
      removeAcao(id)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Perfis de Investimento
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Conheça os diferentes perfis de investidor e descubra qual combina
          mais com você.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {perfis.map((p) => (
          <ProfileCard key={p.tipo} profile={p} />
        ))}
      </div>

      <div id="calculadora">
        <DiscountCalculator
          key={editing?.id ?? 'novo'}
          onSalvar={handleSave}
          editing={editing}
          onCancelEdit={() => setEditing(null)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Salvas</CardTitle>
        </CardHeader>
        <StockDiscountList
          acoes={acoes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  )
}
