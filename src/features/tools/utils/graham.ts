export interface GrahamInput {
  lucroPorAcao: number
  valorPatrimonialPorAcao: number
  precoAtual: number
}

export interface GrahamResult {
  precoJusto: number
  margemSeguranca: number
  potencialValorizacao: number
  explicacao: string
}

export function analisarGraham(input: GrahamInput): GrahamResult {
  const { lucroPorAcao, valorPatrimonialPorAcao, precoAtual } = input

  const precoJusto = Math.sqrt(22.5 * lucroPorAcao * valorPatrimonialPorAcao)
  const margemSeguranca =
    precoJusto > 0 ? ((precoJusto - precoAtual) / precoJusto) * 100 : 0
  const potencialValorizacao =
    precoAtual > 0 ? ((precoJusto - precoAtual) / precoAtual) * 100 : 0

  let explicacao =
    'O método de Benjamin Graham busca encontrar ações subvalorizadas usando a fórmula: Preço Justo = √(22,5 × LPA × VPA). '

  if (margemSeguranca > 30) {
    explicacao += `Com margem de segurança de ${margemSeguranca.toFixed(1)}%, a ação está com desconto significativo em relação ao valor justo. `
  } else if (margemSeguranca > 0) {
    explicacao += `Com margem de segurança de ${margemSeguranca.toFixed(1)}%, a ação pode estar razoavelmente precificada. `
  } else {
    explicacao += `A ação está acima do preço justo calculado, o que exigiria cautela. `
  }

  explicacao +=
    'Esta é uma ferramenta educacional. Não constitui recomendação de investimento.'

  return {
    precoJusto: Math.round(precoJusto * 100) / 100,
    margemSeguranca: Math.round(margemSeguranca * 100) / 100,
    potencialValorizacao: Math.round(potencialValorizacao * 100) / 100,
    explicacao,
  }
}
