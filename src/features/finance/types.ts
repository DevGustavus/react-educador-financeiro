import type { RevenueSource, ExpenseCategory } from '../../types'

export type { RevenueSource, ExpenseCategory }

export interface TransactionFormData {
  descricao: string
  valor: string
  tipo: 'receita' | 'despesa'
  categoria: RevenueSource | ExpenseCategory
  data: string
  observacao: string
}

export interface FinanceFilters {
  tipo: 'todos' | 'receita' | 'despesa'
  categoria: string
  mes: string
}
