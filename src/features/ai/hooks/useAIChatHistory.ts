import { useCallback } from 'react'
import { StorageKeys } from '../../../services/storage/types'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import type { AIChatSession } from '../types'
import { upsertSession, removerSession } from '../utils/sessions'

export function useAIChatHistory() {
  const [sessions, setSessions] = useLocalStorage<AIChatSession[]>(
    StorageKeys.aiHistory,
    [],
  )

  const saveSession = useCallback(
    (session: AIChatSession) =>
      setSessions((prev) => upsertSession(prev, session)),
    [setSessions],
  )

  const removeSession = useCallback(
    (id: string) => setSessions((prev) => removerSession(prev, id)),
    [setSessions],
  )

  return { sessions, saveSession, removeSession }
}
