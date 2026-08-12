import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { formatarMoeda } from '../../../utils/format'
import { calcularProgressoMeta } from '../../../utils/calculations'
import type { FinancialGoal } from '../../../types'

interface Props {
  goals: FinancialGoal[]
}

export function GoalsProgress({ goals }: Props) {
  if (goals.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metas</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        {goals.map((goal) => {
          const progresso = calcularProgressoMeta(
            goal.valorAtual,
            goal.valorAlvo,
          )
          return (
            <div key={goal.id}>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{goal.nome}</span>
                <span className="text-gray-500">
                  {formatarMoeda(goal.valorAtual)} /{' '}
                  {formatarMoeda(goal.valorAlvo)}
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${progresso}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
