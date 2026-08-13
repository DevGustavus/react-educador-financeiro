import { describe, expect, it } from 'vitest'
import { tituloDaSessao, upsertSession, removerSession } from './sessions'
import type { AIMessage, AIChatSession } from '../types'

const msg = (
  role: AIMessage['role'],
  content: string,
  id: string,
): AIMessage => ({
  id,
  role,
  content,
  timestamp: '2026-08-13T00:00:00.000Z',
})

const sessao = (overrides: Partial<AIChatSession> = {}): AIChatSession => ({
  id: 's1',
  title: 'Título',
  createdAt: '2026-08-13T10:00:00.000Z',
  updatedAt: '2026-08-13T11:00:00.000Z',
  messages: [],
  ...overrides,
})

describe('tituloDaSessao', () => {
  it('usa a primeira mensagem do usuário como título', () => {
    expect(
      tituloDaSessao([
        msg('assistant', 'Olá!', 'm1'),
        msg('user', 'Como investir?', 'm2'),
      ]),
    ).toBe('Como investir?')
  })

  it('trunca títulos longos em 50 caracteres', () => {
    expect(tituloDaSessao([msg('user', 'a'.repeat(80), 'm1')])).toBe(
      `${'a'.repeat(50)}...`,
    )
  })

  it('usa fallback quando não há mensagem do usuário', () => {
    expect(tituloDaSessao([])).toBe('Nova conversa')
  })
})

describe('upsertSession', () => {
  it('adiciona sessão nova no início da lista', () => {
    const lista = [sessao({ id: 's2' })]
    const resultado = upsertSession(lista, sessao({ id: 's1' }))
    expect(resultado.map((s) => s.id)).toEqual(['s1', 's2'])
  })

  it('atualiza sessão existente preservando createdAt', () => {
    const lista = [sessao({ id: 's1' })]
    const nova = sessao({
      id: 's1',
      title: 'Novo título',
      updatedAt: '2026-08-13T12:00:00.000Z',
    })
    const resultado = upsertSession(lista, nova)
    expect(resultado).toHaveLength(1)
    expect(resultado[0].title).toBe('Novo título')
    expect(resultado[0].updatedAt).toBe('2026-08-13T12:00:00.000Z')
    expect(resultado[0].createdAt).toBe('2026-08-13T10:00:00.000Z')
  })
})

describe('removerSession', () => {
  it('remove a sessão pelo id', () => {
    const lista = [sessao({ id: 's1' }), sessao({ id: 's2' })]
    expect(removerSession(lista, 's1').map((s) => s.id)).toEqual(['s2'])
  })
})
