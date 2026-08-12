import type { Concept } from '../types'

export const conceitos: Concept[] = [
  {
    id: 'inflacao',
    titulo: 'Inflação',
    resumo: 'Aumento generalizado e contínuo dos preços de bens e serviços.',
    explicacao:
      'Inflação é quando o dinheiro perde poder de compra ao longo do tempo. Se a inflação é de 5% ao ano, algo que custava R$ 100 passa a custar R$ 105. Isso significa que seu dinheiro parado na conta corrente está perdendo valor real.',
    exemplo:
      'Em 2020, com R$ 100 você comprava uma cesta de produtos. Com inflação de 5% ao ano, em 2025 essa mesma cesta custaria cerca de R$ 127,63. Se seu dinheiro não rendeu pelo menos isso, você perdeu poder de compra.',
    categoria: 'conceitos_basicos',
    emoji: '📈',
  },
  {
    id: 'juros',
    titulo: 'Juros',
    resumo: 'Remuneração cobrada pelo uso do dinheiro ao longo do tempo.',
    explicacao:
      'Juros são o custo do dinheiro no tempo. Quando você pega emprestado, paga juros. Quando investe, recebe juros. É o preço pago pela oportunidade de usar um capital que não é seu (ou que você cedeu a outro).',
    exemplo:
      'Se você investe R$ 1.000 a 10% ao ano, após 1 ano você terá R$ 1.100. Os R$ 100 de juros são a recompensa por ter deixado seu dinheiro investido em vez de gastá-lo imediatamente.',
    categoria: 'conceitos_basicos',
    emoji: '💰',
  },
  {
    id: 'juros_compostos',
    titulo: 'Juros Compostos',
    resumo:
      "Juros que incidem sobre juros — o efeito 'bola de neve' do dinheiro.",
    explicacao:
      "Nos juros compostos, os rendimentos de cada período são incorporados ao capital e passam a render também. É o chamado 'juros sobre juros'. Quanto maior o prazo, mais potente é o efeito, pois o crescimento é exponencial.",
    exemplo:
      'R$ 1.000 investidos a 1% ao mês viram R$ 1.126,83 em 1 ano (juros compostos) contra R$ 1.120 (juros simples). Em 20 anos, com R$ 200 mensais a 10% ao ano: juros simples = R$ 88.000; juros compostos ≈ R$ 151.873.',
    categoria: 'conceitos_basicos',
    emoji: '🔄',
  },
  {
    id: 'selic',
    titulo: 'Taxa Selic',
    resumo: 'Taxa básica de juros da economia brasileira, definida pelo Copom.',
    explicacao:
      'A Selic é a taxa que o governo paga para pegar dinheiro emprestado e serve como referência para todas as outras taxas de juros do país. Quando a Selic sobe, os investimentos em renda fixa ficam mais atrativos e o crédito fica mais caro.',
    exemplo:
      'Com a Selic a 13,75% ao ano, um CDB que paga 100% do CDI renderia aproximadamente o mesmo que a Selic. Se a Selic cair para 10%, esse mesmo CDB passaria a render menos, afetando seus investimentos em renda fixa.',
    categoria: 'indicadores',
    emoji: '🏦',
  },
  {
    id: 'cdi',
    titulo: 'CDI',
    resumo:
      'Certificado de Depósito Interbancário — taxa de referência para investimentos.',
    explicacao:
      "O CDI é a taxa de juros usada nos empréstimos entre bancos e costuma ficar muito próxima da Selic. É a referência para a maioria dos investimentos de renda fixa. Quando um investimento diz '100% do CDI', significa que ele rende o mesmo que essa taxa.",
    exemplo:
      'Se o CDI está em 13,65% ao ano, um investimento de R$ 5.000 a 100% do CDI renderia aproximadamente R$ 682,50 em um ano (antes de impostos). Um título a 110% do CDI renderia R$ 750,75.',
    categoria: 'indicadores',
    emoji: '📊',
  },
  {
    id: 'ipca',
    titulo: 'IPCA',
    resumo: 'Índice oficial de inflação do Brasil, medido pelo IBGE.',
    explicacao:
      'O IPCA (Índice de Preços ao Consumidor Amplo) é o termômetro oficial da inflação no Brasil. O Banco Central usa o IPCA como meta de inflação. Investimentos atrelados ao IPCA (como Tesouro IPCA+) protegem seu dinheiro da inflação.',
    exemplo:
      'Se você investe no Tesouro IPCA+ 2045 com taxa de 5,5% ao ano e o IPCA do período foi de 4%, seu rendimento total será de aproximadamente 9,72% (IPCA + 5,5% de juros reais).',
    categoria: 'indicadores',
    emoji: '📉',
  },
  {
    id: 'poder_compra',
    titulo: 'Poder de Compra',
    resumo:
      'Capacidade de adquirir bens e serviços com determinada quantidade de dinheiro.',
    explicacao:
      'Seu poder de compra diminui quando a inflação sobe e sua renda não acompanha. Investir é uma forma de proteger (e aumentar) seu poder de compra ao longo do tempo, fazendo seu dinheiro render acima da inflação.',
    exemplo:
      'Com R$ 50 em 2010 você comprava uma pizza grande. Em 2025, a mesma pizza custa R$ 80. Se seu salário não aumentou proporcionalmente, seu poder de compra diminuiu. Investir com rendimento acima da inflação protege contra essa perda.',
    categoria: 'conceitos_basicos',
    emoji: '🛒',
  },
  {
    id: 'risco',
    titulo: 'Risco',
    resumo: 'Probabilidade de um investimento não entregar o retorno esperado.',
    explicacao:
      'Todo investimento tem algum grau de risco. Renda fixa tem risco baixo (calote do emissor). Renda variável tem risco maior (oscilação de preços). A regra geral é: maior retorno potencial implica maior risco. Diversificar reduz riscos.',
    exemplo:
      'A poupança tem risco praticamente zero, mas rende pouco. Ações podem render muito mais, mas podem cair 30% em um ano ruim. Por isso é importante ter parte em renda fixa (segurança) e parte em renda variável (crescimento).',
    categoria: 'conceitos_basicos',
    emoji: '⚠️',
  },
  {
    id: 'liquidez',
    titulo: 'Liquidez',
    resumo:
      'Facilidade e rapidez para transformar um investimento em dinheiro.',
    explicacao:
      'Liquidez é a capacidade de resgatar seu dinheiro sem perda significativa de valor. Um CDB com liquidez diária permite sacar a qualquer momento. Um imóvel tem baixa liquidez — pode levar meses para vender e converter em dinheiro.',
    exemplo:
      'Se você tem R$ 10.000 na poupança (alta liquidez) e surge uma emergência, você saca no mesmo dia. Se os mesmos R$ 10.000 estão em um título com vencimento em 2030 (baixa liquidez), você pode perder dinheiro se precisar resgatar antes.',
    categoria: 'conceitos_basicos',
    emoji: '💧',
  },
  {
    id: 'diversificacao',
    titulo: 'Diversificação',
    resumo:
      'Estratégia de distribuir investimentos em diferentes ativos para reduzir riscos.',
    explicacao:
      'Diversificar é não colocar todos os ovos na mesma cesta. Ao investir em diferentes tipos de ativos (renda fixa, ações, FIIs, exterior), setores e prazos, você reduz o impacto negativo de um único investimento ruim.',
    exemplo:
      'Se você investe R$ 10.000 apenas em ações de uma empresa e ela tem problemas, você perde tudo. Se divide em 5 ativos diferentes (renda fixa, ações de 3 setores, FIIs), a queda de um setor é compensada por outros.',
    categoria: 'estrategia',
    emoji: '🧺',
  },
  {
    id: 'renda_fixa',
    titulo: 'Renda Fixa',
    resumo:
      'Investimentos com regras de remuneração definidas no momento da aplicação.',
    explicacao:
      'Na renda fixa, você sabe ou tem boa previsão de quanto vai receber. Exemplos: Tesouro Direto, CDB, LCI, LCA, CRI, CRA, debêntures. São considerados mais seguros que renda variável, mas também podem ter riscos (crédito, mercado).',
    exemplo:
      'Um CDB que paga 110% do CDI é renda fixa: você sabe a regra de cálculo (110% do CDI), mesmo sem saber exatamente o valor final. Já uma ação é renda variável: você não sabe quanto valerá amanhã.',
    categoria: 'tipos_investimento',
    emoji: '📜',
  },
  {
    id: 'renda_variavel',
    titulo: 'Renda Variável',
    resumo:
      'Investimentos cujo retorno não é previsível e varia conforme o mercado.',
    explicacao:
      'Na renda variável, o retorno depende de fatores como desempenho da empresa, mercado e economia. Ações, Fundos Imobiliários (FIIs), ETFs, criptomoedas e commodities são exemplos. Oferecem maior potencial de retorno, mas com mais oscilações.',
    exemplo:
      'Uma ação comprada por R$ 50 pode valer R$ 80 no ano seguinte (lucro de 60%) ou cair para R$ 30 (perda de 40%). Por isso, renda variável exige mais estudo, paciência e horizonte de longo prazo.',
    categoria: 'tipos_investimento',
    emoji: '📊',
  },
  {
    id: 'dividendos',
    titulo: 'Dividendos',
    resumo: 'Parte do lucro de uma empresa distribuída aos acionistas.',
    explicacao:
      'Quando você compra ações de uma empresa, torna-se sócio dela. As empresas lucrativas distribuem parte desse lucro aos acionistas na forma de dividendos. São uma fonte de renda passiva e, no Brasil, são isentos de imposto de renda.',
    exemplo:
      'Se uma empresa tem lucro de R$ 1 bilhão e distribui 30% como dividendos, e você possui 0,01% das ações, receberá R$ 300 mil em dividendos naquele ano. Muitos investidores constroem carteiras focadas em empresas boas pagadoras de dividendos.',
    categoria: 'tipos_investimento',
    emoji: '💵',
  },
  {
    id: 'custo_oportunidade',
    titulo: 'Custo de Oportunidade',
    resumo:
      'Aquilo que você deixa de ganhar ao escolher uma alternativa em vez de outra.',
    explicacao:
      'Toda decisão financeira tem um custo de oportunidade. Ao gastar R$ 5.000 em uma viagem, você deixa de investir esse dinheiro. Ao deixar dinheiro parado na conta corrente, você perde o rendimento que ele poderia estar gerando.',
    exemplo:
      'Deixar R$ 10.000 na conta corrente por 1 ano (rendimento zero) quando a Selic está em 12% significa que você perdeu R$ 1.200. Esse é o custo de oportunidade de não ter investido o dinheiro.',
    categoria: 'conceitos_basicos',
    emoji: '🤔',
  },
  {
    id: 'juros_reais',
    titulo: 'Juros Reais',
    resumo: 'Rendimento de um investimento descontada a inflação.',
    explicacao:
      'Juros reais são o que seu dinheiro realmente rendeu após descontar a inflação. Se um investimento rendeu 12% e a inflação foi 5%, o juro real foi de aproximadamente 6,67%. É o que realmente importa para aumentar seu poder de compra.',
    exemplo:
      'Se a poupança rendeu 6% em um ano com inflação de 5%, seu ganho real foi de apenas 0,95%. Já um Tesouro IPCA+ rendendo IPCA + 6% em um ano com inflação de 4% dará aproximadamente 10,24% — ou 6% de juro real.',
    categoria: 'conceitos_basicos',
    emoji: '🧮',
  },
  {
    id: 'reserva_emergencia',
    titulo: 'Reserva de Emergência',
    resumo:
      'Dinheiro guardado para imprevistos — o primeiro passo da organização financeira.',
    explicacao:
      'Reserva de emergência é um valor equivalente a 6-12 meses do seu custo de vida, guardado em um investimento seguro e com alta liquidez. Serve para cobrir imprevistos como perda de emprego, problemas de saúde ou reparos urgentes.',
    exemplo:
      'Se seu custo de vida mensal é R$ 3.000, sua reserva de emergência ideal é de R$ 18.000 a R$ 36.000. Esse dinheiro deve estar em Tesouro Selic, CDB com liquidez diária ou outro investimento seguro e de fácil resgate.',
    categoria: 'estrategia',
    emoji: '🛡️',
  },
]
