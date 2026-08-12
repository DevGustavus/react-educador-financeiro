export interface BazinInput {
  dividendosAnuais: number
  precoAtual: number
  taxaDesejada: number
}

export interface BazinResult {
  dividendYield: number
  precoJusto: number
  explicacao: string
}

export function analisarBazin(input: BazinInput): BazinResult {
  const { dividendosAnuais, precoAtual, taxaDesejada } = input

  const dividendYield =
    precoAtual > 0 ? (dividendosAnuais / precoAtual) * 100 : 0
  const precoJusto = dividendosAnuais / (taxaDesejada / 100)
  const potencialValorizacao =
    precoAtual > 0 ? ((precoJusto - precoAtual) / precoAtual) * 100 : 0

  let explicacao =
    'Décio Bazin focava no investidor de longo prazo que busca dividendos. O preço justo é calculado como: Dividendos Anuais ÷ Taxa Desejada. '

  explicacao += `Com dividend yield de ${dividendYield.toFixed(2)}%, e taxa desejada de ${taxaDesejada}%, o preço justo é R$ ${precoJusto.toFixed(2)}. `

  if (potencialValorizacao > 0) {
    explicacao += `A ação está ${potencialValorizacao.toFixed(1)}% abaixo do preço justo calculado. `
  } else {
    explicacao += `A ação está acima do preço justo calculado. `
  }

  explicacao +=
    'Ferramenta educacional. Não constitui recomendação de investimento.'

  return {
    dividendYield: Math.round(dividendYield * 100) / 100,
    precoJusto: Math.round(precoJusto * 100) / 100,
    explicacao,
  }
}
