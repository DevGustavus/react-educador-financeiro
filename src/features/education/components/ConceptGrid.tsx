import { ConceptCard } from './ConceptCard'
import type { Concept } from '../types'

interface Props {
  concepts: Concept[]
  onSelect: (concept: Concept) => void
}

export function ConceptGrid({ concepts, onSelect }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {concepts.map((c) => (
        <ConceptCard key={c.id} concept={c} onClick={() => onSelect(c)} />
      ))}
    </div>
  )
}
