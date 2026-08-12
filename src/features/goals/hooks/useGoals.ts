import { useMemo } from 'react'
import { useFinance } from '../../../contexts/useFinance'
import { calcularProgressoMeta } from '../../../utils/calculations'

export function useGoals() {
  const { goals, addGoal, updateGoal, removeGoal } = useFinance()

  const goalsComProgresso = useMemo(
    () =>
      goals.map((g) => ({
        ...g,
        progresso: calcularProgressoMeta(g.valorAtual, g.valorAlvo),
      })),
    [goals],
  )

  return {
    goals: goalsComProgresso,
    addGoal,
    updateGoal,
    removeGoal,
  }
}
