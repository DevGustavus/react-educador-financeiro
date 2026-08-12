import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import type { Transaction, FinancialGoal } from '../../../types'

interface Props {
  transactions: Transaction[]
  goals: FinancialGoal[]
  taxaPoupanca: number
  receitaTotal: number
  despesaTotal: number
}

export function FinancialInsights({
  transactions,
  goals,
  taxaPoupanca,
  receitaTotal,
  despesaTotal,
}: Props) {
  const insights = useMemo(() => {
    const result: string[] = []

    if (transactions.length === 0) {
      result.push(
        'Comece registrando suas receitas e despesas na seção de Finanças para receber insights personalizados.',
      )
      return result
    }

    if (taxaPoupanca >= 30) {
      result.push(
        `Sua taxa de poupança de ${taxaPoupanca}% está excelente! Considere investir esse excedente para acelerar seus objetivos.`,
      )
    } else if (taxaPoupanca > 0) {
      result.push(
        `Sua taxa de poupança é de ${taxaPoupanca}%. A recomendação geral é manter pelo menos 20% da renda.`,
      )
    } else if (receitaTotal > 0) {
      result.push(
        'Suas despesas superam ou igualam sua receita. Reveja seus gastos para encontrar oportunidades de economia.',
      )
    }

    if (goals.length === 0) {
      result.push('Defina metas financeiras para dar direção ao seu dinheiro.')
    }

    if (despesaTotal > 0 && receitaTotal > 0) {
      const maiorCategoria = transactions
        .filter((t) => t.tipo === 'despesa')
        .reduce<Record<string, number>>((acc, t) => {
          acc[t.categoria] = (acc[t.categoria] ?? 0) + t.valor
          return acc
        }, {})

      const top = Object.entries(maiorCategoria).sort(
        ([, a], [, b]) => b - a,
      )[0]
      if (top) {
        result.push(
          `Sua maior categoria de gasto é "${top[0]}". Avalie se há espaço para redução nessa área.`,
        )
      }
    }

    return result
  }, [transactions, goals, taxaPoupanca, receitaTotal, despesaTotal])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
      </CardHeader>
      <ul className="space-y-3">
        {insights.map((insight, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"
          >
            <span className="mt-0.5 shrink-0">💡</span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
      {transactions.length === 0 && (
        <div className="mt-4">
          <Link to="/financas">
            <Button>Registrar finanças</Button>
          </Link>
        </div>
      )}
    </Card>
  )
}
