import { Card } from '../../../components/ui/Card'
import { formatarMoeda } from '../../../utils/format'

interface Props {
  receita: number
  despesa: number
  saldo: number
  taxaPoupanca: number
}

export function FinancialSummary({
  receita,
  despesa,
  saldo,
  taxaPoupanca,
}: Props) {
  const items = [
    {
      label: 'Receita Mensal',
      valor: formatarMoeda(receita),
      cor: 'text-emerald-600',
    },
    { label: 'Despesas', valor: formatarMoeda(despesa), cor: 'text-red-500' },
    {
      label: 'Saldo',
      valor: formatarMoeda(saldo),
      cor: saldo >= 0 ? 'text-blue-600' : 'text-red-500',
    },
    {
      label: 'Taxa de Poupança',
      valor: `${taxaPoupanca}%`,
      cor: 'text-amber-600',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className={`mt-1 text-2xl font-bold ${item.cor}`}>{item.valor}</p>
        </Card>
      ))}
    </div>
  )
}
