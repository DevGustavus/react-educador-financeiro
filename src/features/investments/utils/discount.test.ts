import { describe, expect, it } from 'vitest'
import { calcularDescontoAcao } from './discount'

const base = {
  ticker: 'PETR4',
  precoAtual: 10.3,
  lpa: 1.69,
  vpa: 5,
  crescimentoAnual: 11.33,
  dividendYield: 12.33,
  taxaDesejada: 6,
}

describe('calcularDescontoAcao', () => {
  it('rejeita campos vazios, zeros e valores não numéricos', () => {
    const casos = [
      { ...base, ticker: '  ' },
      { ...base, precoAtual: 0 },
      { ...base, lpa: 0 },
      { ...base, vpa: 0 },
      { ...base, crescimentoAnual: 0 },
      { ...base, taxaDesejada: 0 },
      { ...base, dividendYield: -1 },
      { ...base, precoAtual: Number.NaN },
    ]
    for (const caso of casos) {
      expect(calcularDescontoAcao(caso).erro).not.toBeNull()
    }
  })

  it('classifica ação sobreprecificada como ruim nas três fórmulas', () => {
    const r = calcularDescontoAcao({
      ...base,
      precoAtual: 100,
      dividendYield: 1.27,
    })
    expect(r.erro).toBeNull()
    expect(r.bazin.status).toBe('ruim')
    expect(r.graham.status).toBe('ruim')
    expect(r.lynch.status).toBe('ruim')
  })

  it('classifica ação com desconto moderado (bazin bom, graham justo, lynch bom)', () => {
    const r = calcularDescontoAcao(base)
    expect(r.erro).toBeNull()
    expect(r.bazin.status).toBe('bom')
    expect(r.graham.status).toBe('justo')
    expect(r.lynch.status).toBe('bom')
  })

  it('classifica ação muito descontada como boa nas três fórmulas', () => {
    const r = calcularDescontoAcao({ ...base, precoAtual: 5 })
    expect(r.erro).toBeNull()
    expect(r.bazin.status).toBe('bom')
    expect(r.graham.status).toBe('bom')
    expect(r.lynch.status).toBe('bom')
  })
})
