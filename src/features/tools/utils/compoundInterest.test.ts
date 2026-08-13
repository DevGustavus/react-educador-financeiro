import { describe, expect, it } from 'vitest'
import { calcularJurosCompostos } from './compoundInterest'

const base = {
  capitalInicial: 1000,
  aporteMensal: 200,
  taxaAnual: 10,
  anos: 10,
}

describe('calcularJurosCompostos', () => {
  it('converte a taxa anual pela equivalente geométrica', () => {
    const r = calcularJurosCompostos({
      capitalInicial: 1,
      aporteMensal: 0,
      taxaAnual: 10,
      anos: 1,
    })
    expect(r.patrimonioFinal).toBeCloseTo(1.1, 10)
  })

  it('acumula aportes postecipados no fim de cada mês', () => {
    const r = calcularJurosCompostos({
      capitalInicial: 0,
      aporteMensal: 100,
      taxaAnual: 12,
      anos: 1,
    })
    expect(r.patrimonioFinal).toBeCloseTo(1264.65, 2)
  })

  it('fecha a conta: patrimônio = investido + rendimento', () => {
    const r = calcularJurosCompostos(base)
    expect(r.rendimento).toBeCloseTo(r.patrimonioFinal - r.totalInvestido, 10)
  })

  it('taxa zero não divide por zero', () => {
    const r = calcularJurosCompostos({ ...base, taxaAnual: 0 })
    expect(r.totalInvestido).toBe(25000)
    expect(r.patrimonioFinal).toBe(25000)
    expect(r.rendimento).toBe(0)
  })
})
