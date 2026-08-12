import type { InvestorProfileType } from '../types'
import type { FinancialProfile } from '../../../types'

interface ClassificationResult {
  perfil: InvestorProfileType
  explicacao: string
}

export function classificarInvestidor(
  profile: FinancialProfile,
): ClassificationResult {
  const { toleranciaRisco, horizonteInvestimento, conhecimentoFinanceiro } =
    profile

  const pontuacao =
    toleranciaRisco * 0.5 +
    horizonteInvestimento * 0.1 +
    conhecimentoFinanceiro * 0.4

  let perfil: InvestorProfileType
  let explicacao: string

  if (pontuacao <= 2.5) {
    perfil = 'conservador'
    explicacao =
      'Seu perfil foi classificado como Conservador porque você prefere segurança e estabilidade, com baixa tolerância a oscilações. Isso é comum para quem está começando ou tem objetivos de curto prazo. Investimentos em renda fixa, como Tesouro Direto e CDBs, costumam ser mais adequados para este perfil.'
  } else if (pontuacao <= 3.5) {
    perfil = 'moderado'
    explicacao =
      'Seu perfil foi classificado como Moderado porque você aceita algum risco em troca de retornos melhores, mas sem abrir mão de segurança. Uma carteira diversificada entre renda fixa e renda variável costuma atender bem este perfil.'
  } else {
    perfil = 'arrojado'
    explicacao =
      'Seu perfil foi classificado como Arrojado porque você possui maior tolerância a oscilações e um horizonte de investimento mais longo. Isso permite buscar retornos maiores em renda variável, desde que com diversificação e estratégia.'
  }

  return { perfil, explicacao }
}
