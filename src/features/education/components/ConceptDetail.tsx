import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import type { Concept } from '../types'

interface Props {
  concept: Concept
  onBack: () => void
}

export function ConceptDetail({ concept, onBack }: Props) {
  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack}>
        ← Voltar
      </Button>

      <Card>
        <div className="text-3xl">{concept.emoji}</div>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          {concept.titulo}
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          {concept.explicacao}
        </p>

        <div className="mt-6 rounded-lg bg-emerald-50 p-4">
          <h3 className="text-sm font-semibold text-emerald-800">
            Exemplo prático
          </h3>
          <p className="mt-1 text-sm text-emerald-700">{concept.exemplo}</p>
        </div>
      </Card>
    </div>
  )
}
