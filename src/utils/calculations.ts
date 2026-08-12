export function somarPorTipo(valores: number[]): number {
  return valores.reduce((acc, v) => acc + v, 0)
}

export function calcularTaxaPoupanca(receita: number, despesa: number): number {
  if (receita <= 0) return 0
  return Math.round(((receita - despesa) / receita) * 100)
}

export function agruparPorCategoria<
  T extends { categoria: string; valor: number },
>(itens: T[]): { categoria: string; total: number }[] {
  const map = new Map<string, number>()
  for (const item of itens) {
    map.set(item.categoria, (map.get(item.categoria) ?? 0) + item.valor)
  }
  return Array.from(map, ([categoria, total]) => ({ categoria, total }))
}

export function agruparPorMes<T extends { data: string; valor: number }>(
  itens: T[],
): { mes: string; total: number }[] {
  const map = new Map<string, number>()
  for (const item of itens) {
    const mes = item.data.substring(0, 7)
    map.set(mes, (map.get(mes) ?? 0) + item.valor)
  }
  return Array.from(map, ([mes, total]) => ({ mes, total })).sort((a, b) =>
    a.mes.localeCompare(b.mes),
  )
}

export function calcularProgressoMeta(atual: number, alvo: number): number {
  if (alvo <= 0) return 0
  return Math.min(100, Math.round((atual / alvo) * 100))
}
