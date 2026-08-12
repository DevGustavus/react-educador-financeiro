import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

export function HomePage() {
  return (
    <div className="space-y-16 py-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Seu dinheiro merece um plano
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
          Aprenda, organize e simule sua vida financeira com a ajuda de
          inteligência artificial.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/dashboard">
            <Button>Começar minha jornada</Button>
          </Link>
          <Link to="/educacao">
            <Button variant="secondary">Explorar conceitos</Button>
          </Link>
        </div>
      </section>

      <section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              titulo: 'Organize',
              descricao:
                'Registre receitas e despesas de forma simples e acompanhe seu saldo.',
              emoji: '📋',
            },
            {
              titulo: 'Aprenda',
              descricao:
                'Conceitos econômicos explicados com exemplos do dia a dia.',
              emoji: '📚',
            },
            {
              titulo: 'Simule',
              descricao:
                'Calculadoras de juros compostos, liberdade financeira e muito mais.',
              emoji: '🔮',
            },
            {
              titulo: 'Evolua',
              descricao:
                'Defina metas, receba insights e acompanhe seu progresso.',
              emoji: '📈',
            },
          ].map((item) => (
            <Card key={item.titulo}>
              <div className="text-3xl">{item.emoji}</div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {item.titulo}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item.descricao}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Ferramentas disponíveis
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              nome: 'Juros Compostos',
              rota: '/ferramentas',
              descricao:
                'Simule o poder dos juros sobre juros ao longo do tempo.',
            },
            {
              nome: 'Liberdade Financeira',
              rota: '/ferramentas',
              descricao:
                'Estime quanto patrimônio você precisa para viver de renda.',
            },
            {
              nome: 'Perfil de Investidor',
              rota: '/perfil',
              descricao:
                'Descubra se seu perfil é Conservador, Moderado ou Arrojado.',
            },
            {
              nome: 'Análise de Ações',
              rota: '/ferramentas',
              descricao: 'Frameworks educacionais de Graham, Lynch e Bazin.',
            },
            {
              nome: 'IA Financeira',
              rota: '/ia',
              descricao:
                'Tire dúvidas e receba orientações educacionais personalizadas.',
            },
            {
              nome: 'Metas Financeiras',
              rota: '/metas',
              descricao: 'Defina e acompanhe seus objetivos financeiros.',
            },
          ].map((ferramenta) => (
            <Link
              key={ferramenta.nome}
              to={ferramenta.rota}
              className="rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-emerald-300 hover:shadow-sm"
            >
              <h3 className="font-semibold text-gray-900">{ferramenta.nome}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {ferramenta.descricao}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
