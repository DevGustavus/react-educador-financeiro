import { analisarBazin } from '../../tools/utils/bazin'
import { analisarGraham } from '../../tools/utils/graham'
import { analisarLynch } from '../../tools/utils/lynch'
import type {
  ResultadoBazin,
  ResultadoGraham,
  ResultadoLynch,
  StatusDesconto,
} from '../types'

export interface DescontoInput {
  ticker: string
  precoAtual: number
  lpa: number
  vpa: number
  crescimentoAnual: number
  dividendYield: number
  taxaDesejada: number
}

export interface DescontoResultado {
  erro: string | null
  bazin: ResultadoBazin
  graham: ResultadoGraham
  lynch: ResultadoLynch
}

const vazioBazin: ResultadoBazin = {
  valor: 0,
  status: 'ruim',
  precoJusto: 0,
}

const vazioGraham: ResultadoGraham = {
  valor: 0,
  status: 'ruim',
  precoJusto: 0,
}

const vazioLynch: ResultadoLynch = {
  valor: 0,
  status: 'ruim',
  pl: 0,
  peg: 0,
}

const classificar = (valor: number, limiteJusto: number): StatusDesconto => {
  if (valor <= 0) return 'ruim'
  if (valor <= limiteJusto) return 'justo'
  return 'bom'
}

const classificarLynch = (indice: number): StatusDesconto => {
  if (indice < 1) return 'ruim'
  if (indice < 2) return 'justo'
  return 'bom'
}

const validar = (input: DescontoInput): string | null => {
  if (!input.ticker.trim()) return 'Informe o ticker da ação.'
  const campos: [string, number, number][] = [
    ['Preço atual', input.precoAtual, 0],
    ['LPA', input.lpa, 0],
    ['VPA', input.vpa, 0],
    ['Crescimento anual', input.crescimentoAnual, 0],
    ['Taxa desejada', input.taxaDesejada, 0],
    ['Dividend yield', input.dividendYield, -1],
  ]
  for (const [nome, valor, minimo] of campos) {
    if (!Number.isFinite(valor) || valor <= minimo) {
      return `${nome} deve ser um número maior que ${minimo === -1 ? 'ou igual a ' : ''}zero.`
    }
  }
  return null
}

export function calcularDescontoAcao(input: DescontoInput): DescontoResultado {
  const erro = validar(input)
  if (erro) {
    return { erro, bazin: vazioBazin, graham: vazioGraham, lynch: vazioLynch }
  }

  const bazin = analisarBazin({
    dividendYield: input.dividendYield,
    precoAtual: input.precoAtual,
    taxaDesejada: input.taxaDesejada,
  })

  const graham = analisarGraham({
    lucroPorAcao: input.lpa,
    valorPatrimonialPorAcao: input.vpa,
    precoAtual: input.precoAtual,
  })

  const lynch = analisarLynch({
    lucroPorAcao: input.lpa,
    crescimentoAnualEstimado: input.crescimentoAnual,
    dividendYield: input.dividendYield,
    precoAtual: input.precoAtual,
  })

  return {
    erro: null,
    bazin: {
      valor: bazin.potencialValorizacao,
      precoJusto: bazin.precoJusto,
      status: classificar(bazin.potencialValorizacao, 20),
    },
    graham: {
      valor: graham.margemSeguranca,
      precoJusto: graham.precoJusto,
      status: classificar(graham.margemSeguranca, 30),
    },
    lynch: {
      valor: lynch.indiceLynch,
      pl: lynch.plRatio,
      peg: lynch.pegRatio,
      status: classificarLynch(lynch.indiceLynch),
    },
  }
}
