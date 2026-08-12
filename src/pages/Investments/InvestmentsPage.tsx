import { ProfileCard } from '../../features/investments/components/ProfileCard'
import { perfis } from '../../features/investments/data/profiles'

export function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Perfis de Investimento
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Conheça os diferentes perfis de investidor e descubra qual combina
          mais com você.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {perfis.map((p) => (
          <ProfileCard key={p.tipo} profile={p} />
        ))}
      </div>
    </div>
  )
}
