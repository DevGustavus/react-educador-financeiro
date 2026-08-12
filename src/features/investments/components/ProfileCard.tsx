import { Card, CardHeader } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import type { ProfileData } from '../data/profiles'

const COR_TITULO: Record<string, 'emerald' | 'amber' | 'red'> = {
  conservador: 'emerald',
  moderado: 'amber',
  arrojado: 'red',
}

interface Props {
  profile: ProfileData
}

export function ProfileCard({ profile }: Props) {
  return (
    <Card>
      <CardHeader>
        <Badge color={COR_TITULO[profile.tipo] ?? 'gray'}>
          {profile.titulo}
        </Badge>
      </CardHeader>

      <p className="text-sm text-gray-600">{profile.descricao}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-xs text-gray-400">Tolerância a Risco</span>
          <p className="font-medium text-gray-700">{profile.toleranciaRisco}</p>
        </div>
        <div>
          <span className="text-xs text-gray-400">Horizonte</span>
          <p className="font-medium text-gray-700">{profile.horizonte}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase">
            Exemplos de Ativos
          </h4>
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {profile.exemplosAtivos.map((a) => (
              <Badge key={a} color="gray">
                {a}
              </Badge>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold text-emerald-600 uppercase">
              Vantagens
            </h4>
            <ul className="mt-1 space-y-0.5">
              {profile.vantagens.map((v) => (
                <li key={v} className="text-xs text-gray-600">
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-red-500 uppercase">
              Riscos
            </h4>
            <ul className="mt-1 space-y-0.5">
              {profile.riscos.map((r) => (
                <li key={r} className="text-xs text-gray-600">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-3">
          <h4 className="text-xs font-semibold text-blue-700 uppercase">
            Quando faz sentido?
          </h4>
          <p className="mt-1 text-xs text-blue-600">
            {profile.quandoFazSentido}
          </p>
        </div>
      </div>
    </Card>
  )
}
