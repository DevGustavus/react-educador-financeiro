import { Button } from '../../../components/ui/Button'
import { EmptyState } from '../../../components/ui/EmptyState'
import { formatarMoeda, formatarData } from '../../../utils/format'
import type { FinancialGoal } from '../../../types'

interface GoalWithProgress extends FinancialGoal {
  progresso: number
}

interface Props {
  goals: GoalWithProgress[]
  onEdit: (g: FinancialGoal) => void
  onDelete: (id: string) => void
}

export function GoalList({ goals, onEdit, onDelete }: Props) {
  if (goals.length === 0) {
    return (
      <EmptyState
        icon={
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        }
        title="Nenhuma meta definida"
        description="Crie metas financeiras para acompanhar seu progresso em direção aos seus objetivos."
      />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-gray-900">{goal.nome}</h3>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                onClick={() => onEdit(goal)}
                className="px-1.5 py-1 text-xs"
              >
                Editar
              </Button>
              <Button
                variant="ghost"
                onClick={() => onDelete(goal.id)}
                className="px-1.5 py-1 text-xs text-red-500"
              >
                Excluir
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Progresso</span>
              <span className="font-medium text-gray-700">
                {goal.progresso}%
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  goal.progresso >= 100
                    ? 'bg-emerald-500'
                    : goal.progresso >= 50
                      ? 'bg-blue-500'
                      : 'bg-amber-500'
                }`}
                style={{ width: `${goal.progresso}%` }}
              />
            </div>
          </div>

          <div className="mt-3 flex justify-between text-xs text-gray-500">
            <span>
              {formatarMoeda(goal.valorAtual)} / {formatarMoeda(goal.valorAlvo)}
            </span>
            <span>Prazo: {formatarData(goal.prazo)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
