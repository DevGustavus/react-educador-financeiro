export interface CompoundInterestInput {
  capitalInicial: number
  aporteMensal: number
  taxaAnual: number
  anos: number
}

export interface CompoundInterestResult {
  totalInvestido: number
  rendimento: number
  patrimonioFinal: number
  evolucao: {
    ano: number
    total: number
    investido: number
    rendimento: number
  }[]
}

export interface FinancialIndependenceInput {
  custoMensal: number
  taxaRetiradaAnual: number
  patrimonioAtual: number
  aporteMensal: number
  rentabilidadeAnual: number
}

export interface FinancialIndependenceResult {
  patrimonioNecessario: number
  rendaPassivaMensal: number
  tempoEstimadoAnos: number | null
  projecao: { ano: number; patrimonio: number }[]
}
