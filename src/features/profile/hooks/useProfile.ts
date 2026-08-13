import { useFinance } from '../../../contexts/useFinance'
import { classificarInvestidor } from '../utils/classifyInvestor'
import type { FinancialProfile } from '../../../types'

export function useProfile() {
  const { profile, setProfile, removeProfile } = useFinance()

  const salvarPerfil = (data: FinancialProfile) => {
    const { perfil, explicacao } = classificarInvestidor(data)
    setProfile({ ...data, perfilInvestidor: perfil })
    return { perfil, explicacao }
  }

  return {
    profile,
    salvarPerfil,
    removerPerfil: removeProfile,
    temPerfil: profile !== null,
  }
}
