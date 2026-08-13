import { Button } from '../../../components/ui/Button'
import { EmptyState } from '../../../components/ui/EmptyState'
import { formatarData } from '../../../utils/format'
import type { AIChatSession } from '../types'

interface Props {
  sessions: AIChatSession[]
  onLoad: (id: string) => void
  onDelete: (id: string) => void
  disabled: boolean
}

export function AIChatHistory({ sessions, onLoad, onDelete, disabled }: Props) {
  if (sessions.length === 0) {
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        }
        title="Nenhuma conversa salva"
        description="Converse com a IA Educadora e suas conversas aparecerão aqui automaticamente."
      />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sessions.map((session) => (
        <div
          key={session.id}
          role="button"
          tabIndex={0}
          onClick={() => !disabled && onLoad(session.id)}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              onLoad(session.id)
            }
          }}
          className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-emerald-300"
        >
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-gray-900">
                {session.title}
              </h3>
              <p className="mt-0.5 text-xs text-gray-500">
                {formatarData(session.updatedAt.slice(0, 10))} ·{' '}
                {session.messages.length}{' '}
                {session.messages.length === 1 ? 'mensagem' : 'mensagens'}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation()
                  onLoad(session.id)
                }}
                className="px-1.5 py-1 text-xs text-emerald-600"
              >
                Continuar
              </Button>
              <Button
                variant="ghost"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(session.id)
                }}
                className="px-1.5 py-1 text-xs text-red-500"
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
