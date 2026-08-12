export interface ProfileData {
  tipo: string
  titulo: string
  descricao: string
  toleranciaRisco: string
  horizonte: string
  exemplosAtivos: string[]
  vantagens: string[]
  riscos: string[]
  quandoFazSentido: string
}

export const perfis: ProfileData[] = [
  {
    tipo: 'conservador',
    titulo: 'Conservador',
    descricao:
      'O investidor conservador prioriza segurança e estabilidade. Prefere investimentos com baixa oscilação e alta previsibilidade, mesmo que o retorno seja menor. Ideal para quem está começando ou tem objetivos de curto prazo.',
    toleranciaRisco: 'Muito Baixa',
    horizonte: 'Curto (até 2 anos)',
    exemplosAtivos: [
      'Tesouro Selic',
      'CDBs de bancos grandes',
      'LCI/LCA',
      'Fundos de Renda Fixa',
      'Poupança (apenas para reserva imediata)',
    ],
    vantagens: [
      'Baixa volatilidade',
      'Previsibilidade de retorno',
      'Proteção do FGC (até R$ 250 mil)',
      'Ideal para reserva de emergência',
    ],
    riscos: [
      'Rendimento pode não superar a inflação',
      'Menor potencial de crescimento do patrimônio',
      'Tributação via come-cotas em alguns fundos',
    ],
    quandoFazSentido:
      'Para reserva de emergência, objetivos de curto prazo (até 2 anos) ou para quem tem baixa tolerância a oscilações e prefere dormir tranquilo.',
  },
  {
    tipo: 'moderado',
    titulo: 'Moderado',
    descricao:
      'O investidor moderado busca equilíbrio entre segurança e crescimento. Aceita alguma oscilação em troca de retornos melhores, mantendo uma base sólida em renda fixa e diversificando em renda variável.',
    toleranciaRisco: 'Média',
    horizonte: 'Médio (2 a 5 anos)',
    exemplosAtivos: [
      'Tesouro IPCA+',
      'CDBs e Debêntures',
      'Fundos Multimercado',
      'Fundos Imobiliários (FIIs)',
      'ETFs de índice (como BOVA11)',
      'Ações de empresas consolidadas (blue chips)',
    ],
    vantagens: [
      'Bom equilíbrio entre segurança e retorno',
      'Diversificação entre classes de ativos',
      'Potencial de crescimento acima da inflação',
      'Menor volatilidade que perfil arrojado',
    ],
    riscos: [
      'Oscilações podem incomodar em momentos de crise',
      'Alguns ativos exigem mais conhecimento',
      'Pode precisar rebalancear a carteira periodicamente',
    ],
    quandoFazSentido:
      'Para objetivos de médio prazo (2 a 5 anos), construção de patrimônio com equilíbrio, e para quem entende que certa oscilação faz parte do processo de investir.',
  },
  {
    tipo: 'arrojado',
    titulo: 'Arrojado',
    descricao:
      'O investidor arrojado busca maximizar retornos e aceita maiores oscilações. Possui horizonte de longo prazo e entende que a volatilidade de curto prazo é o preço pago por retornos superiores no longo prazo.',
    toleranciaRisco: 'Alta',
    horizonte: 'Longo (5+ anos)',
    exemplosAtivos: [
      'Ações de crescimento (growth stocks)',
      'Small caps',
      'ETFs de setores específicos',
      'Fundos de Ações',
      'Criptomoedas (com moderação)',
      'Investimentos no exterior (BDRs, ETFs internacionais)',
    ],
    vantagens: [
      'Maior potencial de retorno no longo prazo',
      'Exposição a mercados globais',
      'Aproveita o poder dos juros compostos',
      'Hedge natural contra inflação com ativos reais',
    ],
    riscos: [
      'Alta volatilidade (quedas de 30%+ são possíveis)',
      'Exige mais estudo e acompanhamento',
      'Risco de perda permanente se não diversificar',
      'Emocionalmente desafiador em crises',
    ],
    quandoFazSentido:
      'Para objetivos de longo prazo (5+ anos), construção de patrimônio expressivo, e para quem tem estômago para ver oscilações sem tomar decisões precipitadas.',
  },
]
