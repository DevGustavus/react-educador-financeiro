import { Badge } from '../../../components/ui/Badge'
import {
  RECEITA_CATEGORIAS,
  DESPESA_CATEGORIAS,
  CATEGORIA_CORES,
} from '../constants'
import type { BadgeColor } from '../../../components/ui/Badge'

interface Props {
  categoria: string
  tipo: 'receita' | 'despesa'
}

export function CategoryBadge({ categoria, tipo }: Props) {
  const label =
    tipo === 'receita'
      ? (RECEITA_CATEGORIAS[categoria as keyof typeof RECEITA_CATEGORIAS] ??
        categoria)
      : (DESPESA_CATEGORIAS[categoria as keyof typeof DESPESA_CATEGORIAS] ??
        categoria)

  const color = (CATEGORIA_CORES[categoria] as BadgeColor | undefined) ?? 'gray'

  return <Badge color={color}>{label}</Badge>
}
