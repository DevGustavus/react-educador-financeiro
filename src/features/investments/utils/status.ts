import type { BadgeColor } from '../../../components/ui/Badge'
import type { StatusDesconto } from '../types'

export const COR_STATUS: Record<StatusDesconto, BadgeColor> = {
  bom: 'emerald',
  justo: 'amber',
  ruim: 'red',
}

export const ROTULO_STATUS: Record<StatusDesconto, string> = {
  bom: 'Bom',
  justo: 'Justo',
  ruim: 'Ruim',
}
