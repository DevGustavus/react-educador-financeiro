import type { CompoundInterestInput, CompoundInterestResult } from '../types'

const arredondar = (valor: number) =>
  Math.round((valor + Number.EPSILON) * 100) / 100

export function calcularJurosCompostos(
  input: CompoundInterestInput,
): CompoundInterestResult {
  const capitalInicial = Math.max(0, input.capitalInicial)
  const aporteMensal = Math.max(0, input.aporteMensal)
  const anos = Math.max(0, input.anos)
  const taxaMensal = Math.max(0, 1 + input.taxaAnual / 100) ** (1 / 12) - 1
  const meses = anos * 12

  const acumulado = (n: number) => {
    const fator = (1 + taxaMensal) ** n
    const serie =
      taxaMensal === 0
        ? aporteMensal * n
        : aporteMensal * ((fator - 1) / taxaMensal)
    return capitalInicial * fator + serie
  }

  const totalInvestido = capitalInicial + aporteMensal * meses
  const patrimonioFinal = arredondar(acumulado(meses))
  const investidoFinal = arredondar(totalInvestido)

  const evolucao: CompoundInterestResult['evolucao'] = []
  for (let ano = 1; ano <= anos; ano++) {
    const total = acumulado(ano * 12)
    const investido = capitalInicial + aporteMensal * ano * 12
    evolucao.push({
      ano,
      total: arredondar(total),
      investido: arredondar(investido),
      rendimento: arredondar(total - investido),
    })
  }

  return {
    totalInvestido: investidoFinal,
    rendimento: arredondar(patrimonioFinal - investidoFinal),
    patrimonioFinal,
    evolucao,
  }
}
