export interface LynchInput {
  lucroPorAcao: number
  crescimentoAnualEstimado: number
  dividendYield: number
  precoAtual: number
}

export interface LynchResult {
  pegRatio: number
  indiceLynch: number
  explicacao: string
}

export function analisarLynch(input: LynchInput): LynchResult {
  const { lucroPorAcao, crescimentoAnualEstimado, dividendYield, precoAtual } =
    input

  const plRatio = lucroPorAcao > 0 ? precoAtual / lucroPorAcao : 0
  const pegRatio =
    crescimentoAnualEstimado > 0 ? plRatio / crescimentoAnualEstimado : 0
  const indiceLynch =
    pegRatio > 0 ? (crescimentoAnualEstimado + dividendYield) / pegRatio : 0

  let explicacao =
    'Peter Lynch avalia empresas usando o PEG Ratio (P/L ÷ crescimento) e a fórmula: (Crescimento + Dividend Yield) ÷ PEG. '

  if (pegRatio < 1) {
    explicacao += `PEG Ratio de ${pegRatio.toFixed(2)} sugere que a ação pode estar subvalorizada em relação ao crescimento. `
  } else if (pegRatio < 2) {
    explicacao += `PEG Ratio de ${pegRatio.toFixed(2)} está em faixa razoável. `
  } else {
    explicacao += `PEG Ratio de ${pegRatio.toFixed(2)} sugere que a ação pode estar cara em relação ao crescimento. `
  }

  explicacao +=
    'Ferramenta educacional. Não constitui recomendação de investimento.'

  return {
    pegRatio: Math.round(pegRatio * 100) / 100,
    indiceLynch: Math.round(indiceLynch * 100) / 100,
    explicacao,
  }
}
