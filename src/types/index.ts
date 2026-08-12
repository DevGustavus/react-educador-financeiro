export type TransactionType = 'receita' | 'despesa'

export type RevenueSource =
  'salario' | 'freelance' | 'dividendos' | 'renda_extra' | 'outros'

export type ExpenseCategory =
  | 'moradia'
  | 'alimentacao'
  | 'transporte'
  | 'saude'
  | 'educacao'
  | 'lazer'
  | 'assinaturas'
  | 'investimentos'
  | 'outros'

export interface Transaction {
  id: string
  descricao: string
  valor: number
  tipo: TransactionType
  categoria: RevenueSource | ExpenseCategory
  data: string
  observacao?: string
}

export type InvestorProfileType = 'conservador' | 'moderado' | 'arrojado'

export interface FinancialProfile {
  rendaMensal: number
  despesasMedias: number
  patrimonio: number
  reservaEmergencia: number
  objetivos: string
  horizonteInvestimento: number
  toleranciaRisco: 1 | 2 | 3 | 4 | 5
  conhecimentoFinanceiro: 1 | 2 | 3 | 4 | 5
  perfilInvestidor?: InvestorProfileType | null
}

export interface FinancialGoal {
  id: string
  nome: string
  valorAlvo: number
  valorAtual: number
  prazo: string
  criadaEm: string
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
