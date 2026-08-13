export interface LynchInput {
  lucroPorAcao: number
  crescimentoAnualEstimado: number
  dividendYield: number
  precoAtual: number
}

export interface LynchResult {
  plRatio: number
  pegRatio: number
  indiceLynch: number
  explicacao: string
  erro: string | null
}

const arredondar = (valor: number) =>
  Math.round((valor + Number.EPSILON) * 100) / 100

export function analisarLynch(input: LynchInput): LynchResult {
  const { lucroPorAcao, crescimentoAnualEstimado, dividendYield, precoAtual } =
    input

  const vazio: LynchResult = {
    plRatio: 0,
    pegRatio: 0,
    indiceLynch: 0,
    explicacao: '',
    erro: null,
  }

  if (!Number.isFinite(lucroPorAcao) || lucroPorAcao <= 0) {
    return { ...vazio, erro: 'LPA deve ser um número maior que zero.' }
  }
  if (!Number.isFinite(precoAtual) || precoAtual <= 0) {
    return { ...vazio, erro: 'Preço atual deve ser um número maior que zero.' }
  }
  if (
    !Number.isFinite(crescimentoAnualEstimado) ||
    crescimentoAnualEstimado <= 0
  ) {
    return {
      ...vazio,
      erro: 'Crescimento anual deve ser um número maior que zero para interpretar o PEG.',
    }
  }
  if (!Number.isFinite(dividendYield) || dividendYield < 0) {
    return {
      ...vazio,
      erro: 'Dividend Yield deve ser um número maior ou igual a zero.',
    }
  }

  const plRatio = precoAtual / lucroPorAcao
  const pegRatio = plRatio / crescimentoAnualEstimado
  const indiceLynch = (crescimentoAnualEstimado + dividendYield) / plRatio

  let explicacao =
    'Peter Lynch avalia empresas usando o PEG Ratio (P/L ÷ crescimento) e a fórmula: (Crescimento + Dividend Yield) ÷ P/L. '

  if (pegRatio < 1) {
    explicacao += `PEG Ratio de ${pegRatio.toFixed(2)} sugere que a ação pode estar subvalorizada em relação ao crescimento. `
  } else if (pegRatio < 2) {
    explicacao += `PEG Ratio de ${pegRatio.toFixed(2)} está em faixa razoável. `
  } else {
    explicacao += `PEG Ratio de ${pegRatio.toFixed(2)} sugere que a ação pode estar cara em relação ao crescimento. `
  }

  if (indiceLynch < 1) {
    explicacao += 'Baixa atratividade em relação ao crescimento e dividendos. '
  } else if (indiceLynch < 1.5) {
    explicacao += 'Relação razoável entre valuation, crescimento e dividendos. '
  } else if (indiceLynch < 2) {
    explicacao += 'Relação atrativa entre valuation, crescimento e dividendos. '
  } else {
    explicacao +=
      'Relação muito atrativa entre valuation, crescimento e dividendos. '
  }

  explicacao +=
    'Ferramenta educacional. Não constitui recomendação de investimento.'

  return {
    plRatio: arredondar(plRatio),
    pegRatio: arredondar(pegRatio),
    indiceLynch: arredondar(indiceLynch),
    explicacao,
    erro: null,
  }
}
