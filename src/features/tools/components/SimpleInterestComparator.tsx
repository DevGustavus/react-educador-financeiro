import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { formatarMoeda } from '../../../utils/format'
import { calcularJurosCompostos } from '../utils/compoundInterest'
import { calcularJurosSimples } from '../utils/simpleInterest'

export function SimpleInterestComparator() {
  const [capital, setCapital] = useState(10000)
  const [taxa, setTaxa] = useState(10)
  const [anos, setAnos] = useState(5)
  const [resultado, setResultado] = useState<{
    simples: { total: number; rendimento: number }
    composto: {
      totalInvestido: number
      rendimento: number
      patrimonioFinal: number
    }
  } | null>(null)

  const handleCalc = () => {
    const simples = calcularJurosSimples(capital, taxa, anos)
    const composto = calcularJurosCompostos({
      capitalInicial: capital,
      aporteMensal: 0,
      taxaAnual: taxa,
      anos,
    })
    setResultado({ simples, composto })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparador: Juros Simples vs Compostos</CardTitle>
      </CardHeader>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Input
            label="Capital Inicial (R$)"
            type="number"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
          />
          <Input
            label="Taxa Anual (%)"
            type="number"
            step="0.1"
            value={taxa}
            onChange={(e) => setTaxa(Number(e.target.value))}
          />
          <Input
            label="Período (anos)"
            type="number"
            value={anos}
            onChange={(e) => setAnos(Number(e.target.value))}
          />
          <Button onClick={handleCalc} className="w-full">
            Comparar
          </Button>
        </div>

        {resultado && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-700">
                  Juros Simples
                </p>
                <p className="mt-1 text-2xl font-bold text-amber-800">
                  {formatarMoeda(resultado.simples.total)}
                </p>
                <p className="text-xs text-amber-600">
                  Rendimento: {formatarMoeda(resultado.simples.rendimento)}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-700">
                  Juros Compostos
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-800">
                  {formatarMoeda(resultado.composto.patrimonioFinal)}
                </p>
                <p className="text-xs text-emerald-600">
                  Rendimento: {formatarMoeda(resultado.composto.rendimento)}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Diferença:{' '}
              <span className="font-bold text-emerald-600">
                {formatarMoeda(
                  resultado.composto.patrimonioFinal - resultado.simples.total,
                )}
              </span>{' '}
              a mais com juros compostos.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
