import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { formatarMoeda } from '../../../utils/format'
import { calcularJurosCompostos } from '../utils/compoundInterest'
import type { CompoundInterestInput, CompoundInterestResult } from '../types'

export function CompoundInterestCalculator() {
  const [input, setInput] = useState<CompoundInterestInput>({
    capitalInicial: 1000,
    aporteMensal: 200,
    taxaAnual: 10,
    anos: 10,
  })
  const [resultado, setResultado] = useState<CompoundInterestResult | null>(
    null,
  )

  const handleCalc = () => {
    setResultado(calcularJurosCompostos(input))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Juros Compostos</CardTitle>
      </CardHeader>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Input
            label="Capital Inicial (R$)"
            type="number"
            value={input.capitalInicial}
            onChange={(e) =>
              setInput({ ...input, capitalInicial: Number(e.target.value) })
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
            label="Taxa de Juros Anual (%)"
            type="number"
            step="0.1"
            value={input.taxaAnual}
            onChange={(e) =>
              setInput({ ...input, taxaAnual: Number(e.target.value) })
            }
          />
          <Input
            label="Período (anos)"
            type="number"
            value={input.anos}
            onChange={(e) =>
              setInput({ ...input, anos: Number(e.target.value) })
            }
          />
          <Button onClick={handleCalc} className="w-full">
            Calcular
          </Button>
        </div>

        {resultado && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Total Investido</p>
                <p className="font-bold text-gray-900">
                  {formatarMoeda(resultado.totalInvestido)}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-3">
                <p className="text-xs text-emerald-600">Rendimento</p>
                <p className="font-bold text-emerald-700">
                  {formatarMoeda(resultado.rendimento)}
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xs text-blue-600">Patrimônio Final</p>
                <p className="font-bold text-blue-700">
                  {formatarMoeda(resultado.patrimonioFinal)}
                </p>
              </div>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resultado.evolucao}>
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
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Total"
                  />
                  <Line
                    type="monotone"
                    dataKey="investido"
                    stroke="#6b7280"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Investido"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
