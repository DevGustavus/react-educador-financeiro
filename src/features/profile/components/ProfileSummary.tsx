import { Card } from '../../../components/ui/Card'
import { formatarMoeda } from '../../../utils/format'
import type { FinancialProfile } from '../../../types'

const TOLERANCIA_LABELS: Record<number, string> = {
  1: 'Muito Baixa',
  2: 'Baixa',
  3: 'Média',
  4: 'Alta',
  5: 'Muito Alta',
}

const CONHECIMENTO_LABELS: Record<number, string> = {
  1: 'Iniciante',
  2: 'Básico',
  3: 'Intermediário',
  4: 'Avançado',
  5: 'Especialista',
}

interface Props {
  profile: FinancialProfile
}

export function ProfileSummary({ profile }: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Resumo do Perfil
      </h2>
      <dl className="grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-gray-500">Renda Mensal</dt>
          <dd className="font-medium text-gray-900">
            {formatarMoeda(profile.rendaMensal)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Despesas Médias</dt>
          <dd className="font-medium text-gray-900">
            {formatarMoeda(profile.despesasMedias)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Patrimônio</dt>
          <dd className="font-medium text-gray-900">
            {formatarMoeda(profile.patrimonio)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Reserva de Emergência</dt>
          <dd className="font-medium text-gray-900">
            {formatarMoeda(profile.reservaEmergencia)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Tolerância a Risco</dt>
          <dd className="font-medium text-gray-900">
            {TOLERANCIA_LABELS[profile.toleranciaRisco] ??
              profile.toleranciaRisco}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Conhecimento</dt>
          <dd className="font-medium text-gray-900">
            {CONHECIMENTO_LABELS[profile.conhecimentoFinanceiro] ??
              profile.conhecimentoFinanceiro}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Horizonte</dt>
          <dd className="font-medium text-gray-900">
            {profile.horizonteInvestimento} anos
          </dd>
        </div>
        {profile.objetivos && (
          <div>
            <dt className="text-sm text-gray-500">Objetivo</dt>
            <dd className="font-medium text-gray-900">{profile.objetivos}</dd>
          </div>
        )}
        {profile.situacaoFinanceira && (
          <div>
            <dt className="text-sm text-gray-500">Situação Financeira</dt>
            <dd className="font-medium text-gray-900">
              {profile.situacaoFinanceira}
            </dd>
          </div>
        )}
        {profile.poupancaMensal && (
          <div>
            <dt className="text-sm text-gray-500">Quanto guarda por mês</dt>
            <dd className="font-medium text-gray-900">
              {profile.poupancaMensal}
            </dd>
          </div>
        )}
      </dl>
    </Card>
  )
}
