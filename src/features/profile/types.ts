import type { FinancialProfile, InvestorProfileType } from '../../types'

export type { InvestorProfileType }

export type ProfileFormData = FinancialProfile

export interface OnboardingStep {
  titulo: string
  descricao: string
}
