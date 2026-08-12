import type { StorageKey } from './types'

class StorageRepository {
  get<T>(key: StorageKey): T | null {
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return null
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  }

  set<T>(key: StorageKey, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch {
      console.warn(`[Storage] Falha ao salvar chave: ${key}`)
    }
  }

  remove(key: StorageKey): void {
    try {
      localStorage.removeItem(key)
    } catch {
      console.warn(`[Storage] Falha ao remover chave: ${key}`)
    }
  }

  getOrDefault<T>(key: StorageKey, fallback: T): T {
    return this.get<T>(key) ?? fallback
  }
}

export const storage = new StorageRepository()
