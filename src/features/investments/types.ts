export type StatusDesconto = 'bom' | 'justo' | 'ruim'

export interface DescontoFormula {
  valor: number
  status: StatusDesconto
}

export interface ResultadoBazin extends DescontoFormula {
  precoJusto: number
}

export interface ResultadoGraham extends DescontoFormula {
  precoJusto: number
}

export interface ResultadoLynch extends DescontoFormula {
  pl: number
  peg: number
}

export interface AcaoSalva {
  id: string
  ticker: string
  dataAnalise: string
  precoAtual: number
  lpa: number
  vpa: number
  crescimentoAnual: number
  dividendYield: number
  taxaDesejada: number
  bazin: ResultadoBazin
  graham: ResultadoGraham
  lynch: ResultadoLynch
}
