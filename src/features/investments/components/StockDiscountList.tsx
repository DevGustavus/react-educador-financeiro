import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
import { EmptyState } from '../../../components/ui/EmptyState'
import {
  formatarMoeda,
  formatarData,
  formatarNumero,
} from '../../../utils/format'
import { COR_STATUS, ROTULO_STATUS } from '../utils/status'
import type { AcaoSalva } from '../types'

interface Props {
  acoes: AcaoSalva[]
  onEdit: (acao: AcaoSalva) => void
  onDelete: (id: string) => void
}

export function StockDiscountList({ acoes, onEdit, onDelete }: Props) {
  if (acoes.length === 0) {
    return (
      <EmptyState
        icon={
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
        }
        title="Nenhuma ação salva"
        description="Use a calculadora de desconto para analisar uma ação e salvar o resultado aqui."
      />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {acoes.map((acao) => {
        const linhas = [
          {
            nome: 'Bazin (Desconto)',
            valor: acao.bazin,
            sufixo: '%',
            extra:
              acao.bazin.precoJusto != null
                ? `Preço justo: ${formatarMoeda(acao.bazin.precoJusto)}`
                : undefined,
          },
          {
            nome: 'Graham (Margem de Segurança)',
            valor: acao.graham,
            sufixo: '%',
            extra:
              acao.graham.precoJusto != null
                ? `Preço justo: ${formatarMoeda(acao.graham.precoJusto)}`
                : undefined,
          },
          {
            nome: 'Índice de Lynch',
            valor: acao.lynch,
            sufixo: '',
            extra:
              acao.lynch.pl != null
                ? `P/L: ${formatarNumero(acao.lynch.pl)} · PEG: ${formatarNumero(acao.lynch.peg)}`
                : undefined,
          },
        ]
        return (
          <div
            key={acao.id}
            role="button"
            tabIndex={0}
            onClick={() => onEdit(acao)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onEdit(acao)
            }}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-emerald-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{acao.ticker}</h3>
                <p className="text-xs text-gray-500">
                  {formatarMoeda(acao.precoAtual)} ·{' '}
                  {formatarData(acao.dataAnalise)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(acao)
                  }}
                  className="px-1.5 py-1 text-xs text-emerald-600"
                >
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(acao.id)
                  }}
                  className="px-1.5 py-1 text-xs text-red-500"
                >
                  Excluir
                </Button>
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {linhas.map((linha) => (
                <div
                  key={linha.nome}
                  className="flex items-start justify-between gap-2 text-sm"
                >
                  <div>
                    <span className="text-xs text-gray-500">{linha.nome}</span>
                    {linha.extra && (
                      <p className="text-xs text-gray-400">{linha.extra}</p>
                    )}
                  </div>
                  <span className="flex items-center gap-1.5">
                    <span className="font-medium text-gray-700">
                      {formatarNumero(linha.valor.valor)}
                      {linha.sufixo}
                    </span>
                    <Badge color={COR_STATUS[linha.valor.status]}>
                      {ROTULO_STATUS[linha.valor.status]}
                    </Badge>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
