import { useState, useCallback } from 'react'
import { storage } from '../services/storage/repository'
import type { StorageKey } from '../services/storage/types'

export function useLocalStorage<T>(key: StorageKey, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    storage.getOrDefault<T>(key, initialValue),
  )

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value
        storage.set(key, next)
        return next
      })
    },
    [key],
  )

  const removeValue = useCallback(() => {
    storage.remove(key)
    setStoredValue(initialValue)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}
