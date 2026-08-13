import type { AIMessage, AIChatSession } from '../types'

export function tituloDaSessao(messages: AIMessage[]): string {
  const primeira =
    messages.find((m) => m.role === 'user')?.content ?? 'Nova conversa'
  return primeira.length > 50 ? `${primeira.slice(0, 50)}...` : primeira
}

export function upsertSession(
  lista: AIChatSession[],
  session: AIChatSession,
): AIChatSession[] {
  const existente = lista.find((s) => s.id === session.id)
  if (!existente) return [session, ...lista]
  return lista.map((s) =>
    s.id === session.id ? { ...session, createdAt: existente.createdAt } : s,
  )
}

export function removerSession(
  lista: AIChatSession[],
  id: string,
): AIChatSession[] {
  return lista.filter((s) => s.id !== id)
}
