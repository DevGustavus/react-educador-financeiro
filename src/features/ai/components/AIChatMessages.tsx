import { useRef, useEffect } from 'react'
import { Spinner } from '../../../components/ui/Spinner'
import type { AIMessage } from '../types'

interface Props {
  messages: AIMessage[]
  loading: boolean
}

export function AIChatMessages({ messages, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          className="h-12 w-12 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Como posso ajudar?
        </h3>
        <p className="mt-1 max-w-sm text-sm text-gray-500">
          Pergunte sobre conceitos financeiros, estratégias de investimento,
          organização financeira ou tire dúvidas sobre seu dinheiro.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            'Como começar a investir?',
            'O que é renda fixa?',
            'Como poupar dinheiro?',
            'O que é liberdade financeira?',
          ].map((sugestao) => (
            <span
              key={sugestao}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              {sugestao}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="rounded-2xl bg-gray-100 px-4 py-3">
            <Spinner className="text-gray-400" />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
