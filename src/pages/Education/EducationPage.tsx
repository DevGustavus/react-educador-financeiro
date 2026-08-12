import { useState, useMemo } from 'react'
import { Input } from '../../components/ui/Input'
import { ConceptGrid } from '../../features/education/components/ConceptGrid'
import { ConceptDetail } from '../../features/education/components/ConceptDetail'
import { conceitos } from '../../features/education/data/concepts'
import type { Concept } from '../../features/education/types'

export function EducationPage() {
  const [busca, setBusca] = useState('')
  const [selected, setSelected] = useState<Concept | null>(null)

  const filtrados = useMemo(() => {
    if (!busca.trim()) return conceitos
    const termo = busca.toLowerCase()
    return conceitos.filter(
      (c) =>
        c.titulo.toLowerCase().includes(termo) ||
        c.resumo.toLowerCase().includes(termo) ||
        c.categoria.toLowerCase().includes(termo),
    )
  }, [busca])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Educação Financeira
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Aprenda conceitos econômicos explicados de forma simples e prática.
        </p>
      </div>

      {selected ? (
        <ConceptDetail concept={selected} onBack={() => setSelected(null)} />
      ) : (
        <>
          <Input
            placeholder="Buscar conceitos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <ConceptGrid concepts={filtrados} onSelect={setSelected} />
        </>
      )}
    </div>
  )
}
