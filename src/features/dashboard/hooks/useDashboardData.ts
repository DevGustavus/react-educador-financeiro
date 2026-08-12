import { useMemo } from 'react'
import { useFinance } from '../../../contexts/useFinance'
import { somarPorTipo, calcularTaxaPoupanca } from '../../../utils/calculations'

export function useDashboardData() {
  const { transactions, profile, goals } = useFinance()

  const receitaTotal = useMemo(() => {
    const receitas = transactions
      .filter((t) => t.tipo === 'receita')
      .map((t) => t.valor)
    return somarPorTipo(receitas)
  }, [transactions])

  const despesaTotal = useMemo(() => {
    const despesas = transactions
      .filter((t) => t.tipo === 'despesa')
      .map((t) => t.valor)
    return somarPorTipo(despesas)
  }, [transactions])

  const saldo = receitaTotal - despesaTotal

  const taxaPoupanca = calcularTaxaPoupanca(receitaTotal, despesaTotal)

  return {
    transactions,
    profile,
    goals,
    receitaTotal,
    despesaTotal,
    saldo,
    taxaPoupanca,
    temDados: transactions.length > 0,
  }
}
