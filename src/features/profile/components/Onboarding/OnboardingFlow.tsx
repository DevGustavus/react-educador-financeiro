import { useState } from 'react'
import { Button } from '../../../../components/ui/Button'
import { Card } from '../../../../components/ui/Card'
import { useProfile } from '../../hooks/useProfile'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import { StorageKeys } from '../../../../services/storage/types'
import type { FinancialProfile } from '../../../../types'

const STEPS = [
  {
    titulo: 'Qual seu objetivo?',
    descricao:
      'O que você quer alcançar com sua vida financeira? Aposentadoria, casa própria, liberdade financeira?',
  },
  {
    titulo: 'Como está sua vida financeira?',
    descricao:
      'Você tem dívidas? Já tem uma reserva de emergência? Consegue guardar dinheiro todo mês?',
  },
  {
    titulo: 'Quanto você consegue guardar?',
    descricao: 'Do que você ganha, quanto sobra para investir no final do mês?',
  },
  {
    titulo: 'Qual seu conhecimento financeiro?',
    descricao:
      'Você sabe a diferença entre renda fixa e variável? Já investiu alguma vez?',
  },
  {
    titulo: 'Qual sua tolerância a risco?',
    descricao:
      'Como você se sentiria vendo seus investimentos oscilarem 10%, 20% ou mais?',
  },
  {
    titulo: 'Seu perfil financeiro',
    descricao:
      'Com base nas suas respostas, vamos classificar seu perfil de investidor.',
  },
  {
    titulo: 'Seu primeiro plano',
    descricao:
      'Agora você tem um ponto de partida. Vamos organizar seus próximos passos!',
  },
]

interface Props {
  onFinish: () => void
}

export function OnboardingFlow({ onFinish }: Props) {
  const [step, setStep] = useState(0)
  const [, setOnboardingDone] = useLocalStorage(
    StorageKeys.onboardingDone,
    false,
  )
  const { salvarPerfil } = useProfile()

  const [dados, setDados] = useState<FinancialProfile>({
    rendaMensal: 0,
    despesasMedias: 0,
    patrimonio: 0,
    reservaEmergencia: 0,
    objetivos: '',
    horizonteInvestimento: 1,
    toleranciaRisco: 3,
    conhecimentoFinanceiro: 3,
  })

  const handleStepData = (field: keyof FinancialProfile, value: number) => {
    setDados((prev) => ({ ...prev, [field]: value }))
  }

  const handleFinish = () => {
    salvarPerfil(dados)
    setOnboardingDone(true)
    onFinish()
  }

  const currentStep = STEPS[step]

  return (
    <Card className="mx-auto max-w-lg text-center">
      <div className="mb-4 text-sm text-gray-400">
        Passo {step + 1} de {STEPS.length}
      </div>

      <h2 className="text-xl font-bold text-gray-900">{currentStep.titulo}</h2>
      <p className="mt-2 text-sm text-gray-500">{currentStep.descricao}</p>

      <div className="mt-6">
        {step === 0 && (
          <input
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm"
            placeholder="Descreva seu objetivo..."
            value={dados.objetivos}
            onChange={(e) => setDados({ ...dados, objetivos: e.target.value })}
          />
        )}

        {step === 1 && (
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() =>
                  handleStepData(
                    'conhecimentoFinanceiro',
                    n as 1 | 2 | 3 | 4 | 5,
                  )
                }
                className={`flex-1 rounded-xl border p-3 text-sm font-medium transition-colors cursor-pointer ${
                  dados.conhecimentoFinanceiro === n
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Renda mensal (R$)</label>
            <input
              type="number"
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm"
              value={dados.rendaMensal || ''}
              onChange={(e) =>
                setDados({ ...dados, rendaMensal: Number(e.target.value) })
              }
            />
          </div>
        )}

        {step === 3 && (
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() =>
                  handleStepData(
                    'conhecimentoFinanceiro',
                    n as 1 | 2 | 3 | 4 | 5,
                  )
                }
                className={`flex-1 rounded-xl border p-3 text-sm font-medium transition-colors cursor-pointer ${
                  dados.conhecimentoFinanceiro === n
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() =>
                  handleStepData('toleranciaRisco', n as 1 | 2 | 3 | 4 | 5)
                }
                className={`flex-1 rounded-xl border p-3 text-sm font-medium transition-colors cursor-pointer ${
                  dados.toleranciaRisco === n
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {step === 5 && (
          <p className="text-sm text-gray-500">
            Com base nas suas respostas, vamos classificar seu perfil quando
            você finalizar o cadastro na página de Perfil.
          </p>
        )}

        {step === 6 && (
          <p className="text-sm text-gray-500">
            Agora vá até a seção de Finanças e registre suas primeiras receitas
            e despesas. Depois acompanhe seu progresso no Dashboard!
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        {step > 0 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Voltar
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep(step + 1)}>Próximo</Button>
        ) : (
          <Button onClick={handleFinish}>Finalizar</Button>
        )}
      </div>
    </Card>
  )
}
