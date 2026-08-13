import { useState, useCallback, useEffect, useMemo } from 'react'
import { useFinance } from '../../../contexts/useFinance'
import { useAIChatHistory } from './useAIChatHistory'
import { enviarMensagem } from '../services/gemini'
import { tituloDaSessao } from '../utils/sessions'
import type { AIMessage, AIChatStatus } from '../types'

export function useAIChat() {
  const { profile, transactions, goals } = useFinance()
  const { sessions, saveSession, removeSession } = useAIChatHistory()
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [status, setStatus] = useState<AIChatStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const contexto = useMemo(() => {
    const partes: string[] = []

    if (profile) {
      partes.push(
        `Dados do usuário: renda mensal de R$ ${profile.rendaMensal}, despesas de R$ ${profile.despesasMedias}, perfil ${profile.perfilInvestidor ?? 'não definido'}, objetivo: ${profile.objetivos || 'não definido'}.`,
      )
    }

    if (transactions.length > 0) {
      const totalReceitas = transactions
        .filter((t) => t.tipo === 'receita')
        .reduce((s, t) => s + t.valor, 0)
      const totalDespesas = transactions
        .filter((t) => t.tipo === 'despesa')
        .reduce((s, t) => s + t.valor, 0)
      partes.push(
        `Resumo financeiro: receitas R$ ${totalReceitas}, despesas R$ ${totalDespesas}, ${goals.length} metas definidas.`,
      )
    }

    return partes.join(' ') || undefined
  }, [profile, transactions, goals])

  useEffect(() => {
    if (messages.length === 0 || !activeSessionId) return
    const agora = new Date().toISOString()
    saveSession({
      id: activeSessionId,
      title: tituloDaSessao(messages),
      createdAt: agora,
      updatedAt: agora,
      messages,
    })
  }, [messages, activeSessionId, saveSession])

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: AIMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      }

      const sessionId = activeSessionId ?? crypto.randomUUID()
      if (!activeSessionId) setActiveSessionId(sessionId)

      setMessages((prev) => [...prev, userMessage])
      setStatus('loading')
      setError(null)

      try {
        const resposta = await enviarMensagem(
          [...messages, userMessage],
          contexto,
        )

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
    [messages, contexto, activeSessionId],
  )

  const newChat = useCallback(() => {
    setMessages([])
    setActiveSessionId(null)
    setError(null)
    setStatus('idle')
  }, [])

  const loadSession = useCallback(
    (id: string) => {
      const session = sessions.find((s) => s.id === id)
      if (!session) return
      setActiveSessionId(id)
      setMessages(session.messages)
      setError(null)
      setStatus('idle')
    },
    [sessions],
  )

  const deleteSession = useCallback(
    (id: string) => {
      removeSession(id)
      if (activeSessionId === id) {
        setActiveSessionId(null)
        setMessages([])
        setError(null)
        setStatus('idle')
      }
    },
    [removeSession, activeSessionId],
  )

  return {
    messages,
    status,
    error,
    sessions,
    sendMessage,
    newChat,
    loadSession,
    deleteSession,
  }
}
