import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { formatarMoeda } from '../../../utils/format'
import { analisarGraham } from '../utils/graham'
import type { GrahamResult } from '../utils/graham'

export function GrahamAnalysis() {
  const [lpa, setLpa] = useState(0)
  const [vpa, setVpa] = useState(0)
  const [preco, setPreco] = useState(0)
  const [resultado, setResultado] = useState<GrahamResult | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Graham</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Benjamin Graham, considerado o pai do value investing, criou uma
          fórmula para estimar o valor justo de uma ação com base nos
          fundamentos.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            label="Lucro por Ação (LPA)"
            type="number"
            step="0.01"
            value={lpa || ''}
            onChange={(e) => setLpa(Number(e.target.value))}
          />
          <Input
            label="Valor Patrimonial por Ação (VPA)"
            type="number"
            step="0.01"
            value={vpa || ''}
            onChange={(e) => setVpa(Number(e.target.value))}
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
              analisarGraham({
                lucroPorAcao: lpa,
                valorPatrimonialPorAcao: vpa,
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
              <span className="text-gray-500">Preço Justo:</span>
              <span className="font-bold">
                {formatarMoeda(resultado.precoJusto)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Margem de Segurança:</span>
              <span
                className={`font-bold ${resultado.margemSeguranca > 0 ? 'text-emerald-600' : 'text-red-500'}`}
              >
                {resultado.margemSeguranca}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Potencial de Valorização:</span>
              <span
                className={`font-bold ${resultado.potencialValorizacao > 0 ? 'text-emerald-600' : 'text-red-500'}`}
              >
                {resultado.potencialValorizacao}%
              </span>
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
