import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { formatarMoeda } from '../../../utils/format'
import { calcularIndependenciaFinanceira } from '../utils/financialIndependence'
import type {
  FinancialIndependenceInput,
  FinancialIndependenceResult,
} from '../types'

export function FinancialIndependenceSimulator() {
  const [input, setInput] = useState<FinancialIndependenceInput>({
    custoMensal: 5000,
    taxaRetiradaAnual: 4,
    patrimonioAtual: 10000,
    aporteMensal: 2000,
    rentabilidadeAnual: 10,
  })
  const [resultado, setResultado] =
    useState<FinancialIndependenceResult | null>(null)

  const handleCalc = () => {
    setResultado(calcularIndependenciaFinanceira(input))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulador de Liberdade Financeira</CardTitle>
      </CardHeader>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Input
            label="Custo de Vida Mensal (R$)"
            type="number"
            value={input.custoMensal}
            onChange={(e) =>
              setInput({ ...input, custoMensal: Number(e.target.value) })
            }
          />
          <Input
            label="Taxa de Retirada Anual (%)"
            type="number"
            step="0.1"
            value={input.taxaRetiradaAnual}
            onChange={(e) =>
              setInput({
                ...input,
                taxaRetiradaAnual: Number(e.target.value),
              })
            }
          />
          <Input
            label="Patrimônio Atual (R$)"
            type="number"
            value={input.patrimonioAtual}
            onChange={(e) =>
              setInput({ ...input, patrimonioAtual: Number(e.target.value) })
            }
          />
          <Input
            label="Aporte Mensal (R$)"
            type="number"
            value={input.aporteMensal}
            onChange={(e) =>
              setInput({ ...input, aporteMensal: Number(e.target.value) })
            }
          />
          <Input
            label="Rentabilidade Anual (%)"
            type="number"
            step="0.1"
            value={input.rentabilidadeAnual}
            onChange={(e) =>
              setInput({
                ...input,
                rentabilidadeAnual: Number(e.target.value),
              })
            }
          />
          <Button onClick={handleCalc} className="w-full">
            Simular
          </Button>
        </div>

        {resultado && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Patrimônio Necessário</p>
                <p className="font-bold text-gray-900">
                  {formatarMoeda(resultado.patrimonioNecessario)}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3">
                <p className="text-xs text-emerald-600">Renda Passiva / Mês</p>
                <p className="font-bold text-emerald-700">
                  {formatarMoeda(resultado.rendaPassivaMensal)}
                </p>
              </div>
              {resultado.tempoEstimadoAnos && (
                <div className="col-span-2 rounded-lg bg-blue-50 p-3 text-center">
                  <p className="text-xs text-blue-600">Tempo Estimado</p>
                  <p className="font-bold text-blue-700">
                    {resultado.tempoEstimadoAnos} anos
                  </p>
                </div>
              )}
            </div>

            {resultado.projecao.length > 0 && (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resultado.projecao}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="ano" fontSize={12} />
                    <YAxis
                      fontSize={12}
                      tickFormatter={(v) =>
                        new Intl.NumberFormat('pt-BR', {
                          notation: 'compact',
                        }).format(Number(v))
                      }
                    />
                    <Tooltip
                      formatter={(value) =>
                        typeof value === 'number' ? formatarMoeda(value) : ''
                      }
                    />
                    <ReferenceLine
                      y={resultado.patrimonioNecessario}
                      stroke="#ef4444"
                      strokeDasharray="5 5"
                      label="Meta"
                    />
                    <Line
                      type="monotone"
                      dataKey="patrimonio"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <p className="text-xs text-gray-400">
              Esta é uma simulação educacional. Resultados reais dependem de
              múltiplos fatores e não são garantidos.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
