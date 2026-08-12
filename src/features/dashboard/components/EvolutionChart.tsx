import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { agruparPorMes } from '../../../utils/calculations'
import { formatarMoeda, formatarMes } from '../../../utils/format'
import type { Transaction } from '../../../types'

interface Props {
  transactions: Transaction[]
}

export function EvolutionChart({ transactions }: Props) {
  const data = useMemo(() => {
    const receitas = transactions.filter((t) => t.tipo === 'receita')
    const despesas = transactions.filter((t) => t.tipo === 'despesa')

    const porMesReceita = agruparPorMes(receitas)
    const porMesDespesa = agruparPorMes(despesas)

    const allMonths = new Set([
      ...porMesReceita.map((r) => r.mes),
      ...porMesDespesa.map((d) => d.mes),
    ])

    return Array.from(allMonths)
      .sort()
      .map((mes) => {
        const receita = porMesReceita.find((r) => r.mes === mes)?.total ?? 0
        const despesa = porMesDespesa.find((d) => d.mes === mes)?.total ?? 0
        return {
          mes: formatarMes(mes),
          Receita: receita,
          Despesa: despesa,
          Saldo: receita - despesa,
        }
      })
  }, [transactions])

  if (data.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução Financeira</CardTitle>
      </CardHeader>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" fontSize={12} tickLine={false} />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                new Intl.NumberFormat('pt-BR', {
                  notation: 'compact',
                  currency: 'BRL',
                }).format(v)
              }
            />
            <Tooltip
              formatter={(value) =>
                typeof value === 'number' ? formatarMoeda(value) : ''
              }
            />
            <Area
              type="monotone"
              dataKey="Receita"
              stroke="#10b981"
              fill="#d1fae5"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="Despesa"
              stroke="#ef4444"
              fill="#fee2e2"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
