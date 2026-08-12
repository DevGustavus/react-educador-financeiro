const EDUCATIONAL_DISCLAIMER =
  '\n\n---\n*Resposta gerada com finalidade educacional. Não constitui consultoria financeira.*'

const MOCK_RESPONSES: Record<string, string> = {
  default:
    'Entendo sua dúvida! Como Educador Financeiro, posso ajudar você a compreender melhor conceitos financeiros. Poderia dar mais detalhes sobre o que gostaria de saber?',

  investir:
    'Para começar a investir, sugiro seguir estes passos:\n\n1. **Reserva de emergência**: Antes de tudo, tenha de 6 a 12 meses do seu custo de vida em um investimento seguro e com liquidez diária (como Tesouro Selic).\n\n2. **Conheça seu perfil**: Você é conservador, moderado ou arrojado? Isso define quais investimentos fazem sentido para você.\n\n3. **Diversifique**: Não coloque todo seu dinheiro em um só lugar. Combine renda fixa (segurança) e renda variável (crescimento).\n\n4. **Comece simples**: Tesouro Direto e CDBs são bons pontos de partida.\n\n5. **Estude sempre**: Conhecimento é o melhor investimento que você pode fazer.',

  renda_fixa:
    'Renda Fixa são investimentos com regras de rendimento definidas. Os principais tipos:\n\n• **Tesouro Direto**: Títulos públicos federais (Selic, Prefixado, IPCA+)\n• **CDB**: Títulos emitidos por bancos\n• **LCI/LCA**: Isentos de imposto de renda\n• **Debêntures**: Títulos de empresas\n\nA diferença entre eles está no emissor, na tributação, na liquidez e no risco. O Tesouro Selic é o mais seguro do mercado brasileiro.',

  acao: 'Ações representam pequenas partes de uma empresa. Quando você compra uma ação, torna-se sócio. Os ganhos vêm de duas formas:\n\n• **Valorização**: A ação sobe de preço\n• **Dividendos**: Parte do lucro distribuído aos acionistas\n\nNo Brasil, ações são negociadas na B3. Para começar, você precisa de uma conta em uma corretora. Recomenda-se estudar bem a empresa antes de investir.',

  poupar:
    'Para poupar dinheiro de forma eficiente:\n\n1. **Registre tudo**: Anote cada gasto por 30 dias. Você vai se surpreender.\n2. **Regra 50-30-20**: 50% para gastos essenciais, 30% para lazer, 20% para poupança/investimentos.\n3. **Pague-se primeiro**: Assim que receber, separe o valor que quer guardar. Não espere sobrar.\n4. **Automatize**: Configure transferências automáticas para sua conta de investimentos.\n5. **Corte os vazamentos**: Assinaturas esquecidas, juros do rotativo, tarifas bancárias.',

  liberdade:
    'Liberdade financeira significa ter renda passiva suficiente para cobrir seu custo de vida, sem depender de um emprego. O cálculo básico:\n\n**Patrimônio necessário = (Custo de vida anual) / (Taxa de retirada)**\n\nCom a regra dos 4%:\n• Custo mensal: R$ 5.000\n• Custo anual: R$ 60.000\n• Patrimônio necessário: R$ 60.000 / 0,04 = R$ 1.500.000\n\nUse nosso Simulador de Liberdade Financeira nas Ferramentas para calcular o seu caso específico.',
}

function findMockResponse(pergunta: string): string {
  const lower = pergunta.toLowerCase()
  for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(key)) return response + EDUCATIONAL_DISCLAIMER
  }
  return MOCK_RESPONSES.default + EDUCATIONAL_DISCLAIMER
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function enviarMensagem(mensagem: string): Promise<string> {
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Você é um educador financeiro brasileiro. Responda de forma educativa, amigável e com exemplos práticos. Nunca dê recomendações de investimento específicas. Pergunta: ${mensagem}`,
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) throw new Error('Erro ao comunicar com a IA')

    const data = await response.json()
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      'Desculpe, não consegui processar sua pergunta.'
    )
  }

  await delay(800 + Math.random() * 1200)
  return findMockResponse(mensagem)
}
