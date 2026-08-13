import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { formatarMoeda } from '../../../utils/format'
import { analisarBazin } from '../utils/bazin'
import type { BazinResult } from '../utils/bazin'

export function BazinAnalysis() {
  const [dividendos, setDividendos] = useState(0)
  const [preco, setPreco] = useState(0)
  const [taxa, setTaxa] = useState(6)
  const [resultado, setResultado] = useState<BazinResult | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Bazin</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Décio Bazin defendia o investimento focado em bons dividendos. Sua
          fórmula calcula o preço justo de uma ação com base no dividend yield
          (DY) e na taxa de retorno desejada.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            label="Dividend Yield (%)"
            type="number"
            step="0.1"
            value={dividendos || ''}
            onChange={(e) => setDividendos(Number(e.target.value))}
          />
          <Input
            label="Preço Atual (R$)"
            type="number"
            step="0.01"
            value={preco || ''}
            onChange={(e) => setPreco(Number(e.target.value))}
          />
          <Input
            label="Taxa Desejada (%)"
            type="number"
            step="0.1"
            value={taxa}
            onChange={(e) => setTaxa(Number(e.target.value))}
          />
        </div>
        <Button
          onClick={() =>
            setResultado(
              analisarBazin({
                dividendYield: dividendos,
                precoAtual: preco,
                taxaDesejada: taxa,
              }),
            )
          }
        >
          Analisar
        </Button>

        {resultado && (
          <div className="rounded-lg bg-gray-50 p-4 space-y-2">
            {resultado.erro ? (
              <p className="text-sm text-red-600">{resultado.erro}</p>
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Preço Justo:</span>
                  <span className="font-bold">
                    {formatarMoeda(resultado.precoJusto)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dividend Yield:</span>
                  <span className="font-bold text-emerald-600">
                    {resultado.dividendYield}%
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {resultado.explicacao}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
