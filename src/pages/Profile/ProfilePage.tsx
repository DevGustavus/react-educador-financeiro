import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { useProfile } from '../../features/profile/hooks/useProfile'
import { ProfileForm } from '../../features/profile/components/ProfileForm'
import { ProfileClassification } from '../../features/profile/components/ProfileClassification'
import { ProfileSummary } from '../../features/profile/components/ProfileSummary'
import { OnboardingFlow } from '../../features/profile/components/Onboarding/OnboardingFlow'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { StorageKeys } from '../../services/storage/types'
import type { FinancialProfile } from '../../types'

export function ProfilePage() {
  const { profile, salvarPerfil, removerPerfil, temPerfil } = useProfile()
  const [onboardingDone] = useLocalStorage(StorageKeys.onboardingDone, false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [editando, setEditando] = useState(false)

  const classificacao = profile?.perfilInvestidor
    ? {
        perfil: profile.perfilInvestidor,
        explicacao:
          'Perfil classificado anteriormente com base nas suas respostas.',
      }
    : null

  const handleSave = (data: FinancialProfile) => {
    salvarPerfil(data)
    setEditando(false)
  }

  const handleDelete = () => {
    if (confirm('Deseja realmente excluir seu perfil de investimento?')) {
      removerPerfil()
    }
  }

  if (showOnboarding) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Onboarding</h1>
            <p className="mt-1 text-sm text-gray-500">
              Vamos conhecer melhor seu perfil financeiro.
            </p>
          </div>
          <Button variant="secondary" onClick={() => setShowOnboarding(false)}>
            Fechar
          </Button>
        </div>
        <OnboardingFlow onFinish={() => setShowOnboarding(false)} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Perfil Financeiro
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Construa seu perfil de investidor e receba recomendações
            personalizadas.
          </p>
        </div>
        <div className="flex gap-3">
          {!onboardingDone && (
            <Button variant="secondary" onClick={() => setShowOnboarding(true)}>
              Fazer Onboarding
            </Button>
          )}
          {temPerfil && !editando && (
            <Button variant="secondary" onClick={() => setEditando(true)}>
              Editar Perfil
            </Button>
          )}
          {temPerfil && !editando && (
            <Button variant="danger" onClick={handleDelete}>
              Excluir Perfil
            </Button>
          )}
        </div>
      </div>

      {!temPerfil && !editando ? (
        <EmptyState
          icon={
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
          title="Nenhum perfil definido"
          description="Preencha seu perfil financeiro para receber sua classificação de investidor e recomendações personalizadas."
          action={
            <div className="flex gap-3">
              <Button onClick={() => setEditando(true)}>Criar Perfil</Button>
              <Button
                variant="secondary"
                onClick={() => setShowOnboarding(true)}
              >
                Onboarding Guiado
              </Button>
            </div>
          }
        />
      ) : editando ? (
        <>
          <ProfileForm initialData={profile} onSave={handleSave} />
          <Button variant="secondary" onClick={() => setEditando(false)}>
            Cancelar
          </Button>
        </>
      ) : (
        <>
          {profile && <ProfileSummary profile={profile} />}
          {classificacao && (
            <ProfileClassification
              perfil={classificacao.perfil}
              explicacao={classificacao.explicacao}
            />
          )}
        </>
      )}
    </div>
  )
}
