export const STORAGE_PREFIX = 'educador_financeiro'
export const STORAGE_VERSION = 1

export const StorageKeys = {
  profile: `${STORAGE_PREFIX}:v${STORAGE_VERSION}:profile`,
  transactions: `${STORAGE_PREFIX}:v${STORAGE_VERSION}:transactions`,
  goals: `${STORAGE_PREFIX}:v${STORAGE_VERSION}:goals`,
  preferences: `${STORAGE_PREFIX}:v${STORAGE_VERSION}:preferences`,
  aiHistory: `${STORAGE_PREFIX}:v${STORAGE_VERSION}:ai_history`,
  onboardingDone: `${STORAGE_PREFIX}:v${STORAGE_VERSION}:onboarding_done`,
  acoesAnalisadas: `${STORAGE_PREFIX}:v${STORAGE_VERSION}:acoes_analisadas`,
} as const

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys]
