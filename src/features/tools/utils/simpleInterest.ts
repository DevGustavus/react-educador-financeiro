export function calcularJurosSimples(
  capital: number,
  taxaAnual: number,
  anos: number,
): { total: number; rendimento: number } {
  const rendimento = capital * (taxaAnual / 100) * anos
  return {
    total: capital + rendimento,
    rendimento,
  }
}
