import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Badge } from '../../../components/ui/Badge'
import { formatarMoeda, formatarNumero } from '../../../utils/format'
import { calcularDescontoAcao } from '../utils/discount'
import type { DescontoResultado } from '../utils/discount'
import { COR_STATUS, ROTULO_STATUS } from '../utils/status'
import type { AcaoSalva, DescontoFormula } from '../types'

interface Props {
  onSalvar: (acao: AcaoSalva, antigaId?: string) => void
  editing?: AcaoSalva | null
  onCancelEdit: () => void
}

function LinhaResultado({
  nome,
  resultado,
  percentual,
  extra,
}: {
  nome: string
  resultado: DescontoFormula
  percentual: boolean
  extra?: string
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <div>
        <span className="text-gray-500">{nome}:</span>
        {extra && <p className="text-xs text-gray-400">{extra}</p>}
      </div>
      <span className="flex items-center gap-2">
        <span className="font-bold">
          {formatarNumero(resultado.valor)}
          {percentual ? '%' : ''}
        </span>
        <Badge color={COR_STATUS[resultado.status]}>
          {ROTULO_STATUS[resultado.status]}
        </Badge>
      </span>
    </div>
  )
}

export function DiscountCalculator({ onSalvar, editing, onCancelEdit }: Props) {
  const [ticker, setTicker] = useState(editing?.ticker ?? '')
  const [preco, setPreco] = useState(editing?.precoAtual ?? 0)
  const [lpa, setLpa] = useState(editing?.lpa ?? 0)
  const [vpa, setVpa] = useState(editing?.vpa ?? 0)
  const [crescimento, setCrescimento] = useState(editing?.crescimentoAnual ?? 0)
  const [dividendos, setDividendos] = useState(editing?.dividendYield ?? 0)
  const [taxa, setTaxa] = useState(editing?.taxaDesejada ?? 6)
  const [resultado, setResultado] = useState<DescontoResultado | null>(null)

  const calcular = () =>
    setResultado(
      calcularDescontoAcao({
        ticker,
        precoAtual: preco,
        lpa,
        vpa,
        crescimentoAnual: crescimento,
        dividendYield: dividendos,
        taxaDesejada: taxa,
      }),
    )

  const salvar = () => {
    if (!resultado || resultado.erro) return
    const tickerNormalizado = ticker.trim().toUpperCase()
    onSalvar(
      {
        id: tickerNormalizado,
        ticker: tickerNormalizado,
        dataAnalise: new Date().toISOString().slice(0, 10),
        precoAtual: preco,
        lpa,
        vpa,
        crescimentoAnual: crescimento,
        dividendYield: dividendos,
        taxaDesejada: taxa,
        bazin: resultado.bazin,
        graham: resultado.graham,
        lynch: resultado.lynch,
      },
      editing?.id,
    )
    setResultado(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Desconto de Ações</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Combine as fórmulas de Bazin, Graham e Lynch para estimar se uma ação
          está com desconto em relação ao seu valor justo.
        </p>
        {editing && (
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-sm">
            <span className="text-emerald-700">
              Editando análise de <strong>{editing.ticker}</strong>
            </span>
            <Button
              variant="ghost"
              onClick={onCancelEdit}
              className="px-2 py-1 text-xs text-gray-500"
            >
              Cancelar
            </Button>
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            label="Ticker (ex: PETR4)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
          <Input
            label="Preço Atual (R$)"
            type="number"
            step="0.01"
            value={preco || ''}
            onChange={(e) => setPreco(Number(e.target.value))}
          />
          <Input
            label="Lucro por Ação - LPA (R$)"
            type="number"
            step="0.01"
            value={lpa || ''}
            onChange={(e) => setLpa(Number(e.target.value))}
          />
          <Input
            label="Valor Patrimonial por Ação - VPA (R$)"
            type="number"
            step="0.01"
            value={vpa || ''}
            onChange={(e) => setVpa(Number(e.target.value))}
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
            value={dividendos || ''}
            onChange={(e) => setDividendos(Number(e.target.value))}
          />
          <Input
            label="Taxa Desejada Bazin (%)"
            type="number"
            step="0.1"
            value={taxa || ''}
            onChange={(e) => setTaxa(Number(e.target.value))}
          />
        </div>
        <Button onClick={calcular} className="w-full">
          Calcular Desconto
        </Button>

        {resultado && (
          <div className="rounded-lg bg-gray-50 p-4 space-y-2">
            {resultado.erro ? (
              <p className="text-sm text-red-600">{resultado.erro}</p>
            ) : (
              <>
                <LinhaResultado
                  nome="Bazin (Desconto)"
                  resultado={resultado.bazin}
                  percentual
                  extra={`Preço justo: ${formatarMoeda(resultado.bazin.precoJusto)}`}
                />
                <LinhaResultado
                  nome="Graham (Margem de Segurança)"
                  resultado={resultado.graham}
                  percentual
                  extra={`Preço justo: ${formatarMoeda(resultado.graham.precoJusto)}`}
                />
                <LinhaResultado
                  nome="Índice de Lynch"
                  resultado={resultado.lynch}
                  percentual={false}
                  extra={`P/L: ${formatarNumero(resultado.lynch.pl)} · PEG: ${formatarNumero(resultado.lynch.peg)}`}
                />
                <Button onClick={salvar} className="mt-2 w-full">
                  {editing ? 'Atualizar Análise' : 'Salvar Análise'}
                </Button>
              </>
            )}
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
