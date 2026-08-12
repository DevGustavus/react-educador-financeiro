import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { agruparPorCategoria } from '../../../utils/calculations'
import { formatarMoeda } from '../../../utils/format'
import type { Transaction } from '../../../types'

const CATEGORY_COLORS: Record<string, string> = {
  moradia: '#10b981',
  alimentacao: '#f59e0b',
  transporte: '#3b82f6',
  saude: '#ef4444',
  educacao: '#8b5cf6',
  lazer: '#ec4899',
  assinaturas: '#06b6d4',
  investimentos: '#6366f1',
  outros: '#6b7280',
}

const CATEGORY_LABELS: Record<string, string> = {
  moradia: 'Moradia',
  alimentacao: 'Alimentação',
  transporte: 'Transporte',
  saude: 'Saúde',
  educacao: 'Educação',
  lazer: 'Lazer',
  assinaturas: 'Assinaturas',
  investimentos: 'Investimentos',
  outros: 'Outros',
}

interface Props {
  transactions: Transaction[]
}

export function ExpenseChart({ transactions }: Props) {
  const data = useMemo(() => {
    const despesas = transactions.filter((t) => t.tipo === 'despesa')
    return agruparPorCategoria(despesas).map((item) => ({
      name: CATEGORY_LABELS[item.categoria] ?? item.categoria,
      value: item.total,
      color: CATEGORY_COLORS[item.categoria] ?? '#6b7280',
    }))
  }, [transactions])

  if (data.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos por Categoria</CardTitle>
      </CardHeader>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                typeof value === 'number' ? formatarMoeda(value) : ''
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
