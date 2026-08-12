import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { analisarLynch } from '../utils/lynch'
import type { LynchResult } from '../utils/lynch'

export function LynchAnalysis() {
  const [lpa, setLpa] = useState(0)
  const [crescimento, setCrescimento] = useState(0)
  const [dividendYield, setDividendYield] = useState(0)
  const [preco, setPreco] = useState(0)
  const [resultado, setResultado] = useState<LynchResult | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Lynch</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Peter Lynch popularizou o PEG Ratio (P/L dividido pelo crescimento)
          para avaliar se uma ação está cara ou barata em relação ao seu
          potencial de crescimento.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            label="Lucro por Ação (LPA)"
            type="number"
            step="0.01"
            value={lpa || ''}
            onChange={(e) => setLpa(Number(e.target.value))}
          />
          <Input
            label="Crescimento Anual Estimado (%)"
            type="number"
            step="0.1"
            value={crescimento || ''}
            onChange={(e) => setCrescimento(Number(e.target.value))}
          />
          <Input
            label="Dividend Yield (%)"
            type="number"
            step="0.1"
            value={dividendYield || ''}
            onChange={(e) => setDividendYield(Number(e.target.value))}
          />
          <Input
            label="Preço Atual"
            type="number"
            step="0.01"
            value={preco || ''}
            onChange={(e) => setPreco(Number(e.target.value))}
          />
        </div>
        <Button
          onClick={() =>
            setResultado(
              analisarLynch({
                lucroPorAcao: lpa,
                crescimentoAnualEstimado: crescimento,
                dividendYield,
                precoAtual: preco,
              }),
            )
          }
        >
          Analisar
        </Button>

        {resultado && (
          <div className="rounded-lg bg-gray-50 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">PEG Ratio:</span>
              <span className="font-bold">{resultado.pegRatio}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Índice Lynch:</span>
              <span className="font-bold">{resultado.indiceLynch}</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{resultado.explicacao}</p>
            <p className="text-xs text-gray-400">
              Ferramenta educacional. Não constitui recomendação de
              investimento.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
