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
  erro: string | null
}

export function analisarGraham(input: GrahamInput): GrahamResult {
  const { lucroPorAcao, valorPatrimonialPorAcao, precoAtual } = input

  const vazio: GrahamResult = {
    precoJusto: 0,
    margemSeguranca: 0,
    potencialValorizacao: 0,
    explicacao: '',
    erro: null,
  }

  if (!Number.isFinite(lucroPorAcao) || lucroPorAcao <= 0) {
    return {
      ...vazio,
      erro: 'Lucro por Ação (LPA) deve ser um número maior que zero.',
    }
  }
  if (
    !Number.isFinite(valorPatrimonialPorAcao) ||
    valorPatrimonialPorAcao <= 0
  ) {
    return {
      ...vazio,
      erro: 'Valor Patrimonial por Ação (VPA) deve ser um número maior que zero.',
    }
  }
  if (!Number.isFinite(precoAtual) || precoAtual <= 0) {
    return { ...vazio, erro: 'Preço atual deve ser um número maior que zero.' }
  }

  const precoJusto = Math.sqrt(22.5 * lucroPorAcao * valorPatrimonialPorAcao)
  const margemSeguranca = ((precoJusto - precoAtual) / precoJusto) * 100
  const potencialValorizacao = ((precoJusto - precoAtual) / precoAtual) * 100

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
    erro: null,
  }
}
