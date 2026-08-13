import { StorageKeys } from '../../../services/storage/types'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import type { AcaoSalva } from '../types'

export function useAcoesAnalisadas() {
  const [acoes, setAcoes] = useLocalStorage<AcaoSalva[]>(
    StorageKeys.acoesAnalisadas,
    [],
  )

  const salvarAcao = (acao: AcaoSalva, antigaId?: string) =>
    setAcoes((prev) => {
      const base =
        antigaId && antigaId !== acao.id
          ? prev.filter((a) => a.id !== antigaId)
          : prev
      return base.some((a) => a.id === acao.id)
        ? base.map((a) => (a.id === acao.id ? acao : a))
        : [acao, ...base]
    })

  const removeAcao = (id: string) =>
    setAcoes((prev) => prev.filter((a) => a.id !== id))

  return { acoes, salvarAcao, removeAcao }
}
