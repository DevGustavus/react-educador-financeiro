import { createContext, useCallback, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { StorageKeys } from '../services/storage/types'
import type { Transaction, FinancialProfile, FinancialGoal } from '../types'

interface FinanceState {
  transactions: Transaction[]
  profile: FinancialProfile | null
  goals: FinancialGoal[]
}

interface FinanceContextValue extends FinanceState {
  addTransaction: (t: Transaction) => void
  updateTransaction: (t: Transaction) => void
  removeTransaction: (id: string) => void
  setProfile: (p: FinancialProfile) => void
  removeProfile: () => void
  addGoal: (g: FinancialGoal) => void
  updateGoal: (g: FinancialGoal) => void
  removeGoal: (id: string) => void
}

const FinanceContext = createContext<FinanceContextValue | null>(null)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    StorageKeys.transactions,
    [],
  )
  const [profile, setProfileData, removeProfileData] =
    useLocalStorage<FinancialProfile | null>(StorageKeys.profile, null)
  const [goals, setGoals] = useLocalStorage<FinancialGoal[]>(
    StorageKeys.goals,
    [],
  )

  const addTransaction = useCallback(
    (t: Transaction) => setTransactions((prev) => [t, ...prev]),
    [setTransactions],
  )

  const updateTransaction = useCallback(
    (t: Transaction) =>
      setTransactions((prev) => prev.map((x) => (x.id === t.id ? t : x))),
    [setTransactions],
  )

  const removeTransaction = useCallback(
    (id: string) => setTransactions((prev) => prev.filter((x) => x.id !== id)),
    [setTransactions],
  )

  const setProfile = useCallback(
    (p: FinancialProfile) => setProfileData(p),
    [setProfileData],
  )

  const removeProfile = useCallback(
    () => removeProfileData(),
    [removeProfileData],
  )

  const addGoal = useCallback(
    (g: FinancialGoal) => setGoals((prev) => [g, ...prev]),
    [setGoals],
  )

  const updateGoal = useCallback(
    (g: FinancialGoal) =>
      setGoals((prev) => prev.map((x) => (x.id === g.id ? g : x))),
    [setGoals],
  )

  const removeGoal = useCallback(
    (id: string) => setGoals((prev) => prev.filter((x) => x.id !== id)),
    [setGoals],
  )

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        profile,
        goals,
        addTransaction,
        updateTransaction,
        removeTransaction,
        setProfile,
        removeProfile,
        addGoal,
        updateGoal,
        removeGoal,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export { FinanceContext }
export type { FinanceContextValue }
