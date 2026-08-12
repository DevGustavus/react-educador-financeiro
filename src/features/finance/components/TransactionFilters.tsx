import { Select } from '../../../components/ui/Select'
import { RECEITA_CATEGORIAS, DESPESA_CATEGORIAS } from '../constants'
import type { FinanceFilters } from '../types'

const tipoOptions = [
  { value: 'todos', label: 'Todos os tipos' },
  { value: 'receita', label: 'Receitas' },
  { value: 'despesa', label: 'Despesas' },
]

interface Props {
  filters: FinanceFilters
  onChange: <K extends keyof FinanceFilters>(
    key: K,
    value: FinanceFilters[K],
  ) => void
}

export function TransactionFilters({ filters, onChange }: Props) {
  const todasCategorias = {
    todas: 'Todas as categorias',
    ...RECEITA_CATEGORIAS,
    ...DESPESA_CATEGORIAS,
  }

  const categoriaOptions = Object.entries(todasCategorias).map(
    ([value, label]) => ({
      value,
      label,
    }),
  )

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        value={filters.tipo}
        onChange={(e) =>
          onChange('tipo', e.target.value as FinanceFilters['tipo'])
        }
        options={tipoOptions}
      />
      <Select
        value={filters.categoria}
        onChange={(e) => onChange('categoria', e.target.value)}
        options={categoriaOptions}
      />
      <div>
        <input
          type="month"
          value={filters.mes}
          onChange={(e) => onChange('mes', e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
    </div>
  )
}
