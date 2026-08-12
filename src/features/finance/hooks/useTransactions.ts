import { useState, useMemo, useCallback } from 'react'
import { useFinance } from '../../../contexts/useFinance'
import type { Transaction } from '../../../types'
import type { FinanceFilters } from '../types'

export function useTransactions() {
  const { transactions, addTransaction, updateTransaction, removeTransaction } =
    useFinance()

  const [filters, setFilters] = useState<FinanceFilters>({
    tipo: 'todos',
    categoria: 'todas',
    mes: '',
  })

  const setFilter = useCallback(
    <K extends keyof FinanceFilters>(key: K, value: FinanceFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const filtered = useMemo(() => {
    return transactions.filter((t: Transaction) => {
      if (filters.tipo !== 'todos' && t.tipo !== filters.tipo) return false
      if (filters.categoria !== 'todas' && t.categoria !== filters.categoria)
        return false
      if (filters.mes && !t.data.startsWith(filters.mes)) return false
      return true
    })
  }, [transactions, filters])

  return {
    transactions: filtered,
    allTransactions: transactions,
    filters,
    setFilter,
    addTransaction,
    updateTransaction,
    removeTransaction,
  }
}
