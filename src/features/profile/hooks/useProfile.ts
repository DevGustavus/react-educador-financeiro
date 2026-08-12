import { useFinance } from '../../../contexts/useFinance'
import { classificarInvestidor } from '../utils/classifyInvestor'
import type { FinancialProfile } from '../../../types'

export function useProfile() {
  const { profile, setProfile } = useFinance()

  const salvarPerfil = (data: FinancialProfile) => {
    const { perfil, explicacao } = classificarInvestidor(data)
    setProfile({ ...data, perfilInvestidor: perfil })
    return { perfil, explicacao }
  }

  return {
    profile,
    salvarPerfil,
    temPerfil: profile !== null,
  }
}
