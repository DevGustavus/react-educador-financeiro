import { Button } from '../../../components/ui/Button'
import { EmptyState } from '../../../components/ui/EmptyState'
import { formatarMoeda, formatarData } from '../../../utils/format'
import { CategoryBadge } from './CategoryBadge'
import type { Transaction } from '../../../types'

interface Props {
  transactions: Transaction[]
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}

export function TransactionList({ transactions, onEdit, onDelete }: Props) {
  if (transactions.length === 0) {
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        title="Nenhuma transação encontrada"
        description="Use os filtros acima ou registre uma nova transação."
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left">
            <th className="pb-3 font-medium text-gray-500">Descrição</th>
            <th className="pb-3 font-medium text-gray-500">Categoria</th>
            <th className="pb-3 font-medium text-gray-500">Data</th>
            <th className="pb-3 text-right font-medium text-gray-500">Valor</th>
            <th className="pb-3 text-right font-medium text-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b border-gray-50">
              <td className="py-3 pr-4">
                <div>
                  <span className="font-medium text-gray-900">
                    {t.descricao}
                  </span>
                  {t.observacao && (
                    <p className="text-xs text-gray-400">{t.observacao}</p>
                  )}
                </div>
              </td>
              <td className="py-3 pr-4">
                <CategoryBadge categoria={t.categoria} tipo={t.tipo} />
              </td>
              <td className="py-3 pr-4 text-gray-500">
                {formatarData(t.data)}
              </td>
              <td
                className={`py-3 pr-4 text-right font-medium ${
                  t.tipo === 'receita' ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {t.tipo === 'receita' ? '+' : '-'}
                {formatarMoeda(t.valor)}
              </td>
              <td className="py-3 text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    onClick={() => onEdit(t)}
                    className="px-2 py-1 text-xs"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onDelete(t.id)}
                    className="px-2 py-1 text-xs text-red-500 hover:bg-red-50"
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
