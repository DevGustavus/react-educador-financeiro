import { describe, expect, it } from 'vitest'
import { analisarLynch } from './lynch'

describe('analisarLynch', () => {
  it('calcula P/L, PEG e Índice de Lynch com as fórmulas corretas', () => {
    const r = analisarLynch({
      lucroPorAcao: 1.69,
      crescimentoAnualEstimado: 11.33,
      dividendYield: 12.32,
      precoAtual: 10.3,
    })
    expect(r.erro).toBeNull()
    expect(r.plRatio).toBeCloseTo(6.09, 2)
    expect(r.pegRatio).toBeCloseTo(0.54, 2)
    expect(r.indiceLynch).toBeCloseTo(3.88, 2)
    expect(r.indiceLynch).not.toBeCloseTo(43.97, 2)
  })

  it('usa P/L como denominador do Índice de Lynch, não o PEG', () => {
    const r = analisarLynch({
      lucroPorAcao: 1.69,
      crescimentoAnualEstimado: 11.33,
      dividendYield: 12.32,
      precoAtual: 10.3,
    })
    const esperado = (11.33 + 12.32) / (10.3 / 1.69)
    expect(r.indiceLynch).toBeCloseTo(esperado, 2)
  })

  it('rejeita LPA zero, preço zero, crescimento zero e valores não numéricos', () => {
    const base = {
      lucroPorAcao: 1.69,
      crescimentoAnualEstimado: 11.33,
      dividendYield: 12.32,
      precoAtual: 10.3,
    }
    expect(analisarLynch({ ...base, lucroPorAcao: 0 }).erro).not.toBeNull()
    expect(analisarLynch({ ...base, precoAtual: 0 }).erro).not.toBeNull()
    expect(
      analisarLynch({ ...base, crescimentoAnualEstimado: 0 }).erro,
    ).not.toBeNull()
    expect(
      analisarLynch({ ...base, lucroPorAcao: Number.NaN }).erro,
    ).not.toBeNull()
    expect(analisarLynch({ ...base, dividendYield: -1 }).erro).not.toBeNull()
  })
})
