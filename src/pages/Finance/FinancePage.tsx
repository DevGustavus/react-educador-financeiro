import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useTransactions } from '../../features/finance/hooks/useTransactions'
import { TransactionList } from '../../features/finance/components/TransactionList'
import { TransactionForm } from '../../features/finance/components/TransactionForm'
import { TransactionFilters } from '../../features/finance/components/TransactionFilters'
import type { Transaction } from '../../types'

export function FinancePage() {
  const {
    transactions,
    filters,
    setFilter,
    addTransaction,
    updateTransaction,
    removeTransaction,
  } = useTransactions()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const handleEdit = (t: Transaction) => {
    setEditing(t)
    setFormOpen(true)
  }

  const handleSave = (t: Transaction) => {
    if (editing) {
      updateTransaction(t)
    } else {
      addTransaction(t)
    }
    setEditing(null)
  }

  const handleClose = () => {
    setFormOpen(false)
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente excluir esta transação?')) {
      removeTransaction(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finanças</h1>
          <p className="mt-1 text-sm text-gray-500">
            Registre e acompanhe suas receitas e despesas.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>Nova Transação</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transações</CardTitle>
          <TransactionFilters filters={filters} onChange={setFilter} />
        </CardHeader>
        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <TransactionForm
        key={editing?.id ?? 'novo'}
        open={formOpen}
        onClose={handleClose}
        onSave={handleSave}
        editing={editing}
      />
    </div>
  )
}
