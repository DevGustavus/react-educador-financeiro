export interface BazinInput {
  dividendYield: number
  precoAtual: number
  taxaDesejada: number
}

export interface BazinResult {
  dividendYield: number
  precoJusto: number
  potencialValorizacao: number
  explicacao: string
  erro: string | null
}

export function analisarBazin(input: BazinInput): BazinResult {
  const { dividendYield, precoAtual, taxaDesejada } = input

  const vazio: BazinResult = {
    dividendYield: 0,
    precoJusto: 0,
    potencialValorizacao: 0,
    explicacao: '',
    erro: null,
  }

  if (!Number.isFinite(dividendYield) || dividendYield < 0) {
    return {
      ...vazio,
      erro: 'Dividend Yield deve ser um número maior ou igual a zero.',
    }
  }
  if (!Number.isFinite(precoAtual) || precoAtual <= 0) {
    return { ...vazio, erro: 'Preço atual deve ser um número maior que zero.' }
  }
  if (!Number.isFinite(taxaDesejada) || taxaDesejada <= 0) {
    return {
      ...vazio,
      erro: 'Taxa desejada deve ser um número maior que zero.',
    }
  }

  const dividendosAnuais = (dividendYield / 100) * precoAtual
  const precoJusto = dividendosAnuais / (taxaDesejada / 100)
  const potencialValorizacao = ((precoJusto - precoAtual) / precoAtual) * 100

  let explicacao =
    'Décio Bazin focava no investidor de longo prazo que busca dividendos. O preço justo é calculado como: (Dividend Yield × Preço Atual) ÷ Taxa Desejada. '

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
    potencialValorizacao: Math.round(potencialValorizacao * 100) / 100,
    explicacao,
    erro: null,
  }
}
