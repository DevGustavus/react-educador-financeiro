import type { Concept } from '../types'

interface Props {
  concept: Concept
  onClick?: () => void
}

export function ConceptCard({ concept, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-gray-200 bg-white p-5 text-left transition-colors hover:border-emerald-300 hover:shadow-sm cursor-pointer"
    >
      <div className="text-2xl">{concept.emoji}</div>
      <h3 className="mt-2 font-semibold text-gray-900">{concept.titulo}</h3>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
        {concept.resumo}
      </p>
    </button>
  )
}
