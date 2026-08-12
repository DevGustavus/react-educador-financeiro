import type {
  FinancialIndependenceInput,
  FinancialIndependenceResult,
} from '../types'

export function calcularIndependenciaFinanceira(
  input: FinancialIndependenceInput,
): FinancialIndependenceResult {
  const {
    custoMensal,
    taxaRetiradaAnual,
    patrimonioAtual,
    aporteMensal,
    rentabilidadeAnual,
  } = input

  const patrimonioNecessario = (custoMensal * 12) / (taxaRetiradaAnual / 100)

  const rendaPassivaMensal = (patrimonioAtual * (rentabilidadeAnual / 100)) / 12

  const rentabilidadeMensal = rentabilidadeAnual / 100 / 12

  let anosEstimados: number | null = null
  const projecao: { ano: number; patrimonio: number }[] = []

  if (aporteMensal > 0) {
    let patrimonio = patrimonioAtual
    for (let ano = 0; ano <= 100; ano++) {
      if (ano > 0) {
        projecao.push({
          ano,
          patrimonio: Math.round(patrimonio * 100) / 100,
        })
      }
      if (patrimonio >= patrimonioNecessario && anosEstimados === null) {
        anosEstimados = ano
      }
      for (let mes = 0; mes < 12; mes++) {
        patrimonio = patrimonio * (1 + rentabilidadeMensal) + aporteMensal
      }
    }
  }

  return {
    patrimonioNecessario: Math.round(patrimonioNecessario * 100) / 100,
    rendaPassivaMensal: Math.round(rendaPassivaMensal * 100) / 100,
    tempoEstimadoAnos: anosEstimados,
    projecao,
  }
}
