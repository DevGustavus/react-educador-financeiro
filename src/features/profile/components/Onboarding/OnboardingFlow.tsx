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
    titulo: 'Qual sua renda mensal?',
    descricao:
      'Quanto você recebe por mês, somando todas as suas fontes de renda?',
  },
  {
    titulo: 'Quanto você gasta por mês?',
    descricao:
      'Qual o total das suas despesas mensais, incluindo contas, mercado e lazer?',
  },
  {
    titulo: 'Quanto você consegue guardar?',
    descricao: 'Do que você ganha, quanto sobra para investir no final do mês?',
  },
  {
    titulo: 'Qual seu patrimônio total?',
    descricao:
      'Quanto você já acumulou, somando investimentos, imóveis e outros bens?',
  },
  {
    titulo: 'Qual sua reserva de emergência?',
    descricao:
      'Quanto você tem guardado para imprevistos, fora dos investimentos?',
  },
  {
    titulo: 'Qual seu horizonte de investimento?',
    descricao: 'Por quantos anos você pretende deixar seu dinheiro investido?',
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

const OBJETIVOS_CHIPS = [
  'Aposentadoria',
  'Casa própria',
  'Liberdade financeira',
  'Reserva de emergência',
  'Viajar',
]

const SITUACAO_OPTIONS = [
  {
    value: 'Tenho dívidas para quitar',
    label: 'Tenho dívidas',
    desc: 'Preciso organizar o que devo antes de poupar.',
  },
  {
    value: 'Pago as contas, mas não sobra',
    label: 'Contas no limite',
    desc: 'Fecho o mês no zero, sem folga.',
  },
  {
    value: 'Guardo um pouco todo mês',
    label: 'Guardo um pouco',
    desc: 'Consigo poupar parte da renda todo mês.',
  },
  {
    value: 'Tenho reserva de emergência',
    label: 'Reserva formada',
    desc: 'Já tenho segurança para imprevistos.',
  },
  {
    value: 'Invisto regularmente',
    label: 'Já invisto',
    desc: 'Aplico meu dinheiro com frequência.',
  },
]

const POUPANCA_OPTIONS = [
  'Nada por enquanto',
  'Menos de R$ 100',
  'R$ 100 a R$ 500',
  'R$ 500 a R$ 1.000',
  'Mais de R$ 1.000',
]

const CONHECIMENTO_OPTIONS = [
  { value: 1, label: 'Iniciante', desc: 'Estou começando a aprender agora.' },
  { value: 2, label: 'Básico', desc: 'Conheço o essencial sobre finanças.' },
  { value: 3, label: 'Intermediário', desc: 'Já invisto há algum tempo.' },
  { value: 4, label: 'Avançado', desc: 'Invisto e estudo o mercado.' },
  {
    value: 5,
    label: 'Especialista',
    desc: 'Domino estratégias de investimento.',
  },
]

const RISCO_OPTIONS = [
  {
    value: 1,
    label: 'Muito Baixa',
    desc: 'Não aceito perder nada, prefiro segurança.',
  },
  { value: 2, label: 'Baixa', desc: 'Aceito apenas pequenas oscilações.' },
  {
    value: 3,
    label: 'Média',
    desc: 'Tolero oscilações moderadas por retorno melhor.',
  },
  {
    value: 4,
    label: 'Alta',
    desc: 'Aceito oscilações fortes em busca de retorno.',
  },
  {
    value: 5,
    label: 'Muito Alta',
    desc: 'Busco o máximo retorno, mesmo com risco alto.',
  },
]

interface Option {
  value: string | number
  label: string
  desc?: string
}

interface OptionListProps {
  options: Option[]
  selected: string | number | undefined
  onSelect: (value: string | number) => void
}

function OptionList({ options, selected, onSelect }: OptionListProps) {
  return (
    <div className="space-y-2 text-left">
      {options.map((option) => {
        const isSelected = selected === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`flex w-full flex-col rounded-xl border p-3 transition-colors cursor-pointer ${
              isSelected
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span
              className={`text-sm font-medium ${
                isSelected ? 'text-emerald-700' : 'text-gray-700'
              }`}
            >
              {option.label}
            </span>
            {option.desc && (
              <span className="mt-0.5 text-xs text-gray-400">
                {option.desc}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

interface NumberStepProps {
  placeholder: string
  value: number
  onChange: (value: number) => void
}

function NumberStep({ placeholder, value, onChange }: NumberStepProps) {
  return (
    <input
      type="number"
      step="0.01"
      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm"
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  )
}

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

  const handleStepData = (
    field: keyof FinancialProfile,
    value: string | number,
  ) => {
    setDados((prev) => ({ ...prev, [field]: value }) as FinancialProfile)
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
          <div className="space-y-3">
            <div className="flex flex-wrap justify-center gap-2">
              {OBJETIVOS_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setDados({ ...dados, objetivos: chip })}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors cursor-pointer ${
                    dados.objetivos === chip
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
            <input
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm"
              placeholder="Ou descreva seu objetivo..."
              value={dados.objetivos}
              onChange={(e) =>
                setDados({ ...dados, objetivos: e.target.value })
              }
            />
          </div>
        )}

        {step === 1 && (
          <OptionList
            options={SITUACAO_OPTIONS}
            selected={dados.situacaoFinanceira}
            onSelect={(value) => handleStepData('situacaoFinanceira', value)}
          />
        )}

        {step === 2 && (
          <NumberStep
            placeholder="Ex: 5000"
            value={dados.rendaMensal}
            onChange={(value) => handleStepData('rendaMensal', value)}
          />
        )}

        {step === 3 && (
          <NumberStep
            placeholder="Ex: 4000"
            value={dados.despesasMedias}
            onChange={(value) => handleStepData('despesasMedias', value)}
          />
        )}

        {step === 4 && (
          <OptionList
            options={POUPANCA_OPTIONS.map((faixa) => ({
              value: faixa,
              label: faixa,
            }))}
            selected={dados.poupancaMensal}
            onSelect={(value) => handleStepData('poupancaMensal', value)}
          />
        )}

        {step === 5 && (
          <NumberStep
            placeholder="Ex: 50000"
            value={dados.patrimonio}
            onChange={(value) => handleStepData('patrimonio', value)}
          />
        )}

        {step === 6 && (
          <NumberStep
            placeholder="Ex: 6000"
            value={dados.reservaEmergencia}
            onChange={(value) => handleStepData('reservaEmergencia', value)}
          />
        )}

        {step === 7 && (
          <NumberStep
            placeholder="Ex: 5"
            value={dados.horizonteInvestimento}
            onChange={(value) => handleStepData('horizonteInvestimento', value)}
          />
        )}

        {step === 8 && (
          <OptionList
            options={CONHECIMENTO_OPTIONS}
            selected={dados.conhecimentoFinanceiro}
            onSelect={(value) =>
              handleStepData('conhecimentoFinanceiro', value)
            }
          />
        )}

        {step === 9 && (
          <OptionList
            options={RISCO_OPTIONS}
            selected={dados.toleranciaRisco}
            onSelect={(value) => handleStepData('toleranciaRisco', value)}
          />
        )}

        {step === 10 && (
          <p className="text-sm text-gray-500">
            Com base nas suas respostas, vamos classificar seu perfil quando
            você finalizar o cadastro na página de Perfil.
          </p>
        )}

        {step === 11 && (
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
