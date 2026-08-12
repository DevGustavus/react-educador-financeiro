import type { CompoundInterestInput, CompoundInterestResult } from '../types'

export function calcularJurosCompostos(
  input: CompoundInterestInput,
): CompoundInterestResult {
  const { capitalInicial, aporteMensal, taxaAnual, anos } = input
  const taxaMensal = taxaAnual / 100 / 12
  const meses = anos * 12

  let total = capitalInicial
  let totalInvestido = capitalInicial
  const evolucao: CompoundInterestResult['evolucao'] = []

  for (let mes = 1; mes <= meses; mes++) {
    total = total * (1 + taxaMensal) + aporteMensal
    totalInvestido += aporteMensal

    if (mes % 12 === 0) {
      evolucao.push({
        ano: mes / 12,
        total: Math.round(total * 100) / 100,
        investido: Math.round(totalInvestido * 100) / 100,
        rendimento: Math.round((total - totalInvestido) * 100) / 100,
      })
    }
  }

  const patrimonioFinal = Math.round(total * 100) / 100
  const investidoFinal = Math.round(totalInvestido * 100) / 100

  return {
    totalInvestido: investidoFinal,
    rendimento: Math.round((patrimonioFinal - investidoFinal) * 100) / 100,
    patrimonioFinal,
    evolucao,
  }
}
