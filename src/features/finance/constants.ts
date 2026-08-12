import type { RevenueSource, ExpenseCategory } from './types'

export const RECEITA_CATEGORIAS: Record<RevenueSource, string> = {
  salario: 'Salário',
  freelance: 'Freelance',
  dividendos: 'Dividendos',
  renda_extra: 'Renda Extra',
  outros: 'Outros',
}

export const DESPESA_CATEGORIAS: Record<ExpenseCategory, string> = {
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

export const CATEGORIA_CORES: Record<string, string> = {
  salario: 'emerald',
  freelance: 'blue',
  dividendos: 'purple',
  renda_extra: 'amber',
  moradia: 'emerald',
  alimentacao: 'amber',
  transporte: 'blue',
  saude: 'red',
  educacao: 'purple',
  lazer: 'pink',
  assinaturas: 'cyan',
  investimentos: 'indigo',
  outros: 'gray',
} as const
