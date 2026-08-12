import { useState, useCallback } from 'react'
import { useFinance } from '../../../contexts/useFinance'
import { enviarMensagem } from '../services/gemini'
import type { AIMessage, AIChatStatus } from '../types'

export function useAIChat() {
  const { profile, transactions, goals } = useFinance()
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [status, setStatus] = useState<AIChatStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: AIMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, userMessage])
      setStatus('loading')
      setError(null)

      try {
        let contextualPrompt = content

        if (profile) {
          contextualPrompt += `\n\n[Contexto do usuário: renda mensal de R$ ${profile.rendaMensal}, despesas de R$ ${profile.despesasMedias}, perfil ${profile.perfilInvestidor ?? 'não definido'}, objetivo: ${profile.objetivos || 'não definido'}].`
        }

        if (transactions.length > 0) {
          const totalReceitas = transactions
            .filter((t) => t.tipo === 'receita')
            .reduce((s, t) => s + t.valor, 0)
          const totalDespesas = transactions
            .filter((t) => t.tipo === 'despesa')
            .reduce((s, t) => s + t.valor, 0)
          contextualPrompt += ` [Resumo financeiro: receitas R$ ${totalReceitas}, despesas R$ ${totalDespesas}, ${goals.length} metas definidas].`
        }

        const resposta = await enviarMensagem(contextualPrompt)

        const assistantMessage: AIMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: resposta,
          timestamp: new Date().toISOString(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setStatus('idle')
      } catch {
        setError('Não foi possível obter uma resposta. Tente novamente.')
        setStatus('error')
      }
    },
    [profile, transactions, goals],
  )

  const clearChat = useCallback(() => {
    setMessages([])
    setError(null)
    setStatus('idle')
  }, [])

  return {
    messages,
    status,
    error,
    sendMessage,
    clearChat,
  }
}
