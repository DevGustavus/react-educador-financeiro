import { Card } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import type { InvestorProfileType } from '../types'

const PERFIL_CORES: Record<InvestorProfileType, 'emerald' | 'amber' | 'red'> = {
  conservador: 'emerald',
  moderado: 'amber',
  arrojado: 'red',
}

const PERFIL_LABELS: Record<InvestorProfileType, string> = {
  conservador: 'Conservador',
  moderado: 'Moderado',
  arrojado: 'Arrojado',
}

interface Props {
  perfil: InvestorProfileType
  explicacao: string
}

export function ProfileClassification({ perfil, explicacao }: Props) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Badge color={PERFIL_CORES[perfil]}>{PERFIL_LABELS[perfil]}</Badge>
        <h2 className="text-lg font-semibold text-gray-900">
          Classificação do Perfil
        </h2>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{explicacao}</p>
    </Card>
  )
}
